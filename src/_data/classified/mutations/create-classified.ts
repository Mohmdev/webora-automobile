'use server'

import { randomInt } from 'node:crypto'
import { auth } from '@/auth'
import { routes } from '@/config/routes'
import { prisma } from '@/lib/prisma'
import { generateThumbHashFromSrcUrl } from '@/lib/thumbhash-server'
import {
  BodyType,
  Colour,
  CurrencyCode,
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
 * Type for generative classified data
 */
export interface GenerativeClassifiedData {
  year?: number | null
  makeId?: number | null
  modelId?: number | null
  modelVariantId?: number | null
  vrm?: string | null
  image?: string | null
  description?: string | null
  odoReading?: number | null
  odoUnit?: OdoUnit | null
  fuelType?: FuelType | null
  bodyType?: BodyType | null
  transmission?: Transmission | null
  colour?: Colour | null
  ulezCompliance?: ULEZCompliance | null
  doors?: number | null
  seats?: number | null
}

/**
 * Type for finder function results
 */
export type FindResult<_T> = {
  success: boolean
  make?: Make
  model?: Model
  error?: string
  message?: string
}

/**
 * Finds a vehicle make by ID with fallback to UNKNOWN
 *
 * @param makeId - The ID of the make to find
 * @returns Object with success status and make data if found
 */
export async function findMake(
  makeId: number | null | undefined
): Promise<FindResult<Make>> {
  let make = makeId
    ? await prisma.make.findUnique({ where: { id: Number(makeId) } })
    : null

  if (!make) {
    make = await prisma.make.findFirst({ where: { name: 'UNKNOWN' } })
    if (!make) {
      return {
        success: false,
        error: 'Make not found and no UNKNOWN make available as fallback',
        message: 'Make not found and no UNKNOWN make available as fallback',
      }
    }
  }

  return { success: true, make }
}

/**
 * Finds a vehicle model by ID with fallback to UNKNOWN
 *
 * @param modelId - The ID of the model to find
 * @param makeId - The ID of the make the model belongs to
 * @returns Object with success status and model data if found
 */
export async function findModel(
  modelId: number | null | undefined,
  makeId: number
): Promise<FindResult<Model>> {
  let model = modelId
    ? await prisma.model.findUnique({ where: { id: Number(modelId) } })
    : null

  if (!model) {
    model = await prisma.model.findFirst({
      where: {
        makeId: makeId,
        name: 'UNKNOWN',
      },
    })
    if (!model) {
      return {
        success: false,
        error: 'Model not found and no UNKNOWN model available as fallback',
        message: 'Model not found and no UNKNOWN model available as fallback',
      }
    }
  }

  return { success: true, model }
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
export async function generateTitle(
  year: number | undefined,
  make: Make,
  model: Model,
  modelVariant: ModelVariant | null
): Promise<string> {
  const titleParts = [
    year && year > 0 ? year.toString() : null,
    make.name !== 'UNKNOWN' ? make.name : null,
    model.name !== 'UNKNOWN' ? model.name : null,
  ].filter((part): part is string => part !== null && part.trim().length > 0)

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
 * Generates a unique URL-friendly slug for a classified listing
 *
 * @param title - The listing title
 * @param vrm - The vehicle registration mark
 * @returns A URL-friendly slug string
 */
export async function generateSlug(
  title: string,
  vrm: string | undefined
): Promise<string> {
  let slug = slugify(`${title} ${vrm ?? randomInt(100000, 999999)}`)

  const slugLikeFound = await prisma.classified.count({
    where: { slug: { contains: slug, mode: 'insensitive' } },
  })

  if (slugLikeFound) {
    slug = slugify(`${title} ${vrm} ${slugLikeFound + 1}`)
  }

  return slug
}

/**
 * Creates a new classified listing
 *
 * @param data - The classified data
 * @param slug - The generated URL-friendly slug
 * @param title - The generated title
 * @param make - The vehicle make
 * @param model - The vehicle model
 * @param modelVariant - The vehicle model variant
 * @param thumbhashUri - The thumbhash URI for the main image
 * @returns The created classified record
 */
export async function createClassifiedRecord(
  data: GenerativeClassifiedData,
  slug: string,
  title: string,
  make: Make,
  model: Model,
  modelVariant: ModelVariant | null,
  thumbhashUri: string
) {
  return await prisma.classified.create({
    data: {
      slug,
      title,
      year: Number(data.year),
      makeId: make.id,
      modelId: model.id,
      ...(modelVariant && {
        modelVariantId: modelVariant.id,
      }),
      vrm: data?.vrm ? data.vrm : null,
      price: 0,
      currency: CurrencyCode.GBP,
      odoReading: data.odoReading ?? 0,
      odoUnit: data.odoUnit ?? OdoUnit.KILOMETERS,
      fuelType: data.fuelType ?? FuelType.PETROL,
      bodyType: data.bodyType ?? BodyType.SEDAN,
      colour: data.colour ?? Colour.BLACK,
      transmission: data.transmission ?? Transmission.MANUAL,
      ulezCompliance: data.ulezCompliance ?? ULEZCompliance.EXEMPT,
      description: data.description ?? null,
      doors: data.doors ?? 0,
      seats: data.seats ?? 0,
      images: {
        create: {
          isMain: true,
          blurhash: thumbhashUri,
          src: data.image as string,
          alt: title,
        },
      },
    },
  })
}

/**
 * Creates a new classified advertisement
 *
 * This is the main function for creating a classified listing. It coordinates
 * the creation process by:
 * 1. Finding the necessary taxonomy data (make, model, variant)
 * 2. Generating title and slug
 * 3. Processing the image
 * 4. Creating the classified record
 * 5. Revalidating affected routes
 *
 * Used in admin dashboard for vehicle listing creation.
 *
 * @param data - The generative classified data
 * @returns Object with success status, optional message, and created ID
 */
export async function createClassified(data: GenerativeClassifiedData) {
  let success = false
  let classifiedId: number | null = null

  const session = await auth()
  if (!session) {
    return { success: false, error: 'Unauthorized' }
  }

  try {
    // Find make
    const makeResult = await findMake(data.makeId)
    if (!makeResult.success || !makeResult.make) {
      return {
        success: false,
        error: makeResult.error,
        message: makeResult.message || makeResult.error,
      }
    }
    const make = makeResult.make

    // Find model
    const modelResult = await findModel(data.modelId, make.id)
    if (!modelResult.success || !modelResult.model) {
      return {
        success: false,
        error: modelResult.error,
        message: modelResult.message || modelResult.error,
      }
    }
    const model = modelResult.model

    // Get model variant
    const modelVariant = await getModelVariant(data.modelVariantId)

    // Generate title
    const title = await generateTitle(
      data.year ?? undefined,
      make,
      model,
      modelVariant
    )

    // Generate slug
    const slug = await generateSlug(title, data.vrm ?? undefined)

    // Generate thumbhash
    const thumbhash = await generateThumbHashFromSrcUrl(data.image as string)
    const uri = createPngDataUri(thumbhash)

    // Create classified
    const classified = await createClassifiedRecord(
      data,
      slug,
      title,
      make,
      model,
      modelVariant,
      uri
    )

    if (classified) {
      classifiedId = classified.id
      success = true
      revalidatePath(routes.admin.classifieds)
    }

    return {
      success,
      classifiedId,
      data: classified,
    }
  } catch (error) {
    return {
      success: false,
      message: `Something went wrong: ${error}`,
      error: `Something went wrong: ${error}`,
    }
  }
}
