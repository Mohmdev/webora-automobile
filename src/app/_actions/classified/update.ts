'use server'
import { auth } from '@/auth'
import { routes } from '@/config/routes'
import { prisma } from '@/lib/prisma'
import { generateThumbHashFromSrcUrl } from '@/lib/thumbhash-server'
import {
  BodyType,
  ClassifiedStatus,
  Colour,
  type CurrencyCode,
  FuelType,
  type Make,
  type Model,
  type ModelVariant,
  OdoUnit,
  Transmission,
  ULEZCompliance,
} from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import slugify from 'slugify'
import { createPngDataUri } from 'unlazy/thumbhash'

// Define the type for the update classified data
interface UpdateClassifiedType {
  id: number
  make: number | string
  model: number | string
  modelVariant?: number | string | null | undefined
  year?: number | string
  vrm?: string
  price: number
  currency: CurrencyCode
  odoReading?: number
  odoUnit?: OdoUnit
  fuelType?: FuelType
  bodyType?: BodyType
  transmission?: Transmission
  colour?: Colour
  ulezCompliance?: ULEZCompliance
  description?: string | null
  doors?: number
  seats?: number
  status?: ClassifiedStatus
  images: Array<{ src: string }>
}

// Results type for the finder functions
// type FindResult<_TypeOfOutcome> = {
//   success: boolean
//   make?: Make
//   model?: Model
//   error?: string
// }

// Helper function to find make
const findMake = async (
  makeId: number | null | undefined
): Promise<Make | null> => {
  if (!makeId) {
    return null
  }
  return await prisma.make.findUnique({
    where: { id: Number(makeId) },
  })
}

// Helper function to find model
const findModel = async (
  modelId: number | null | undefined
): Promise<Model | null> => {
  if (!modelId) {
    return null
  }

  return await prisma.model.findUnique({
    where: { id: Number(modelId) },
  })
}

// Helper function to get model variant
const getModelVariant = async (
  modelVariantId: number | null | undefined
): Promise<ModelVariant | null> => {
  if (!modelVariantId) {
    return null
  }

  return await prisma.modelVariant.findUnique({
    where: { id: Number(modelVariantId) },
  })
}

// Helper function to generate title
const generateTitle = (
  year: number | string | undefined,
  make: Make | null,
  model: Model | null,
  modelVariant: ModelVariant | null
): string => {
  const titleParts = [
    year && Number(year) > 0 ? year.toString() : null,
    make?.name !== 'UNKNOWN' ? make?.name : null,
    model?.name !== 'UNKNOWN' ? model?.name : null,
  ].filter((part): part is string => {
    return part !== null && part !== undefined && part.trim().length > 0
  })

  let title = titleParts.join(' ').trim()

  if (
    modelVariant &&
    modelVariant.name !== '-' &&
    modelVariant.name !== 'UNKNOWN'
  ) {
    title = `${title} ${modelVariant.name}`.trim()
  }

  return title
}

// Helper function to generate slug
const generateSlug = (title: string, vrm: string | undefined): string => {
  return slugify(`${title} ${vrm || ''}`)
}

// Helper function to process images
const processImages = async (
  images: Array<{ src: string }>,
  classifiedId: number,
  title: string
) => {
  const imagesData = await Promise.all(
    images.map(async ({ src }, index) => {
      const hash = await generateThumbHashFromSrcUrl(images[0].src)
      const uri = createPngDataUri(hash)
      return {
        classifiedId,
        isMain: !index,
        blurhash: uri,
        src,
        alt: `${title} ${index + 1}`,
      }
    })
  )

  return imagesData
}

// Helper function to update classified with transaction
const updateClassifiedWithTransaction = async (
  data: UpdateClassifiedType,
  slug: string,
  title: string,
  makeId: number,
  modelId: number,
  modelVariantId: number | null
) => {
  return await prisma.$transaction(
    async (prisma) => {
      await prisma.image.deleteMany({
        where: { classifiedId: data.id },
      })

      const imagesData = await processImages(data.images, data.id, title)

      const images = await prisma.image.createManyAndReturn({
        data: imagesData,
      })

      const classified = await prisma.classified.update({
        where: { id: data.id },
        data: {
          slug,
          title,
          year: Number(data.year || 0),
          makeId,
          modelId,
          ...(modelVariantId && { modelVariantId }),
          vrm: data.vrm || null,
          price: data.price * 100,
          currency: data.currency,
          odoReading: data.odoReading || 0,
          odoUnit: data.odoUnit || OdoUnit.KILOMETERS,
          fuelType: data.fuelType || FuelType.PETROL,
          bodyType: data.bodyType || BodyType.SEDAN,
          transmission: data.transmission || Transmission.MANUAL,
          colour: data.colour || Colour.BLACK,
          ulezCompliance: data.ulezCompliance || ULEZCompliance.EXEMPT,
          description: data.description || null,
          doors: data.doors || 0,
          seats: data.seats || 0,
          status: data.status || ClassifiedStatus.DRAFT,
          images: { set: images.map((image) => ({ id: image.id })) },
        },
      })

      return [classified, images]
    },
    { timeout: 10000 }
  )
}

export const updateClassifiedAction = async (data: UpdateClassifiedType) => {
  const session = await auth()
  if (!session) {
    return { success: false, error: 'Unauthorized' }
  }

  let success = false

  try {
    // Find make and model
    const makeId = Number(data.make)
    const modelId = Number(data.model)
    const modelVariantId = data.modelVariant ? Number(data.modelVariant) : null

    const make = await findMake(makeId)
    const model = await findModel(modelId)
    const modelVariant = await getModelVariant(modelVariantId)

    // Generate title and slug
    const title = generateTitle(data.year, make, model, modelVariant)
    const slug = generateSlug(title, data.vrm)

    // Update classified with transaction
    const [classified, images] = await updateClassifiedWithTransaction(
      data,
      slug,
      title,
      makeId,
      modelId,
      modelVariantId
    )

    if (classified && images) {
      success = true
    }
  } catch (err) {
    if (err instanceof Error) {
      return { success: false, message: err.message }
    }
    return { success: false, message: 'Something went wrong' }
  }

  if (success) {
    revalidatePath(routes.admin.classifieds)
    redirect(routes.admin.classifieds)
  } else {
    return { success: false, message: 'Failed to update classified' }
  }
}
