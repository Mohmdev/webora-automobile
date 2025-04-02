'use server'

import { auth } from '@/auth'
import { routes } from '@/config/routes'
import { prisma } from '@/lib/prisma'
import { generateThumbHashFromSrcUrl } from '@/lib/thumbhash-server'
import type { UpdateClassifiedType } from '@/schemas/classified.schema'
import {
  BodyType,
  ClassifiedStatus,
  Colour,
  FuelType,
  type Make,
  type Model,
  type ModelVariant,
  OdoUnit,
  Transmission,
  ULEZCompliance,
} from '@prisma/client'
import { revalidatePath } from 'next/cache'
import slugify from 'slugify'
import { createPngDataUri } from 'unlazy/thumbhash'

/**
 * Finds a vehicle make by ID
 *
 * @param makeId - The ID of the make to find
 * @returns The make record or null if not found
 */
export async function findMake(
  makeId: number | null | undefined
): Promise<Make | null> {
  if (!makeId) {
    return null
  }
  return await prisma.make.findUnique({
    where: { id: Number(makeId) },
  })
}

/**
 * Finds a vehicle model by ID
 *
 * @param modelId - The ID of the model to find
 * @returns The model record or null if not found
 */
export async function findModel(
  modelId: number | null | undefined
): Promise<Model | null> {
  if (!modelId) {
    return null
  }

  return await prisma.model.findUnique({
    where: { id: Number(modelId) },
  })
}

/**
 * Finds a vehicle model variant by ID
 *
 * @param modelVariantId - The ID of the model variant to find
 * @returns The model variant record or null if not found
 */
export async function getModelVariant(
  modelVariantId: number | null | undefined
): Promise<ModelVariant | null> {
  if (!modelVariantId) {
    return null
  }

  return await prisma.modelVariant.findUnique({
    where: { id: Number(modelVariantId) },
  })
}

/**
 * Generates a title for a classified listing
 *
 * @param year - The vehicle year
 * @param make - The vehicle make
 * @param model - The vehicle model
 * @param modelVariant - The vehicle model variant
 * @returns A formatted title string
 */
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

/**
 * Generates a URL-friendly slug for a classified listing
 *
 * @param title - The listing title
 * @param vrm - The vehicle registration mark
 * @returns A URL-friendly slug string
 */
const generateSlug = (title: string, vrm: string | undefined): string => {
  return slugify(`${title} ${vrm || ''}`)
}

/**
 * Processes images for a classified listing
 *
 * Generates thumbhash blurry placeholders for each image and prepares the image data
 * for database storage.
 *
 * @param images - Array of image sources
 * @param classifiedId - The ID of the classified listing
 * @param title - The title of the classified listing
 * @returns Array of processed image data
 */
export async function processImages(
  images: Array<{ src: string }>,
  classifiedId: number,
  title: string
) {
  const imagesData = await Promise.all(
    images.map(async ({ src }, index) => {
      const hash = await generateThumbHashFromSrcUrl(src)
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

/**
 * Updates a classified listing with transaction safety
 *
 * Handles the complete update process including:
 * - Deleting existing images
 * - Processing and creating new images
 * - Updating all classified fields
 *
 * @param data - The classified data to update
 * @param slug - The generated URL-friendly slug
 * @param title - The generated title
 * @param makeId - The make ID
 * @param modelId - The model ID
 * @param modelVariantId - The model variant ID
 * @returns The updated classified and its images
 */
export async function updateClassifiedWithTransaction(
  data: UpdateClassifiedType,
  slug: string,
  title: string,
  makeId: number,
  modelId: number,
  modelVariantId: number | null
) {
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

/**
 * Updates a classified advertisement
 *
 * This is the main function for updating a classified listing. It coordinates
 * the update process by:
 * 1. Finding the necessary taxonomy data (make, model, variant)
 * 2. Generating title and slug
 * 3. Processing the update in a transaction
 * 4. Revalidating affected routes
 *
 * Used in admin dashboard for vehicle listing management.
 *
 * @param data - The classified data to update
 * @returns Object with success status and optional message
 */
export async function updateClassified(data: UpdateClassifiedType) {
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
      revalidatePath(routes.admin.classifieds)
    }

    return { success, data: { classified, images } }
  } catch (err) {
    if (err instanceof Error) {
      return { success: false, message: err.message }
    }
    return { success: false, message: 'Something went wrong' }
  }
}
