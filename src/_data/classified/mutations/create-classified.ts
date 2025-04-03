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
 * Finds a vehicle make by its ID, with a fallback to an 'UNKNOWN' make.
 *
 * Queries the database for a make with the given ID. If not found or ID is null/undefined,
 * it attempts to find a make named 'UNKNOWN'.
 *
 * @param {number | null | undefined} makeId - The ID of the make to find.
 * @returns {Promise<FindResult<Make>>} A promise resolving to an object indicating success or failure.
 *          On success, contains the found `Make` object (either the specific one or 'UNKNOWN').
 *          On failure, includes an error message.
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
 * Finds a vehicle model by its ID within a specific make, with a fallback to an 'UNKNOWN' model.
 *
 * Queries the database for a model with the given ID. If not found or ID is null/undefined,
 * it attempts to find a model named 'UNKNOWN' associated with the specified `makeId`.
 *
 * @param {number | null | undefined} modelId - The ID of the model to find.
 * @param {number} makeId - The ID of the make the model belongs to.
 * @returns {Promise<FindResult<Model>>} A promise resolving to an object indicating success or failure.
 *          On success, contains the found `Model` object (either the specific one or 'UNKNOWN').
 *          On failure, includes an error message.
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
 * Finds a vehicle model variant by its ID.
 *
 * Queries the database for a model variant with the given ID. Returns null if the ID is null/undefined
 * or if the variant is not found.
 *
 * @param {number | null | undefined} modelVariantId - The ID of the model variant to find.
 * @returns {Promise<ModelVariant | null>} A promise resolving to the found `ModelVariant` object or null.
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
 * Generates a formatted title string for a classified listing based on vehicle details.
 *
 * Combines the year, make name, and model name. Appends the model variant name if it's
 * available and not a placeholder ('-' or 'UNKNOWN'). Ensures parts are trimmed and joined correctly.
 *
 * @param {number | undefined} year - The vehicle manufacturing year.
 * @param {Make} make - The vehicle make object.
 * @param {Model} model - The vehicle model object.
 * @param {ModelVariant | null} modelVariant - The vehicle model variant object, or null if not applicable.
 * @returns {Promise<string>} A promise resolving to the generated title string.
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
 * Generates a unique, URL-friendly slug for a classified listing.
 *
 * Creates a slug based on the title and Vehicle Registration Mark (VRM). If no VRM is provided,
 * a random number is appended. Checks for existing slugs containing the base slug and appends
 * a counter if duplicates are found to ensure uniqueness.
 *
 * @param {string} title - The listing title.
 * @param {string | undefined} vrm - The vehicle registration mark (optional).
 * @returns {Promise<string>} A promise resolving to the generated unique slug string.
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
 * Creates a new classified listing record in the database.
 *
 * Constructs the database record using the provided generative data, generated slug/title,
 * make/model/variant objects, and thumbhash URI. Sets default values for fields like price,
 * currency, etc., if not provided in the input data.
 *
 * @param {GenerativeClassifiedData} data - The core data for the classified listing.
 * @param {string} slug - The generated unique URL-friendly slug.
 * @param {string} title - The generated listing title.
 * @param {Make} make - The associated vehicle make object.
 * @param {Model} model - The associated vehicle model object.
 * @param {ModelVariant | null} modelVariant - The associated vehicle model variant object, or null.
 * @param {string} thumbhashUri - The Data URI for the image's thumbhash placeholder.
 * @returns {Promise<import('@prisma/client').Classified>} A promise resolving to the newly created `Classified` database record.
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
 * Creates a new classified advertisement listing.
 *
 * This is the main server action for creating a classified listing. It performs the following steps:
 * 1. Verifies user authentication.
 * 2. Finds the necessary taxonomy data (make, model, variant) using helper functions, with fallbacks.
 * 3. Generates a unique title and slug for the listing.
 * 4. Generates a ThumbHash Data URI for the primary image.
 * 5. Creates the classified record in the database using `createClassifiedRecord`.
 * 6. Revalidates the admin classifieds path cache (`routes.admin.classifieds`).
 *
 * Handles errors during the process and returns a structured response indicating success or failure.
 * Used primarily in the admin dashboard for vehicle listing creation.
 *
 * @param {GenerativeClassifiedData} data - An object containing the initial data for the classified listing (year, makeId, modelId, image, etc.).
 * @returns {Promise<{
 *   success: boolean;
 *   classifiedId?: number | null;
 *   data?: import('@prisma/client').Classified | null;
 *   message?: string;
 *   error?: string;
 * }>} A promise resolving to an object indicating the outcome:
 *   - On success: `{ success: true, classifiedId: number, data: Classified }`
 *   - On failure (e.g., auth error, DB error, missing taxonomy): `{ success: false, error: string, message?: string }`
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
