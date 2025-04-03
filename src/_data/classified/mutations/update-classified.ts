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
 * Finds a vehicle make by its ID.
 *
 * @param {number | null | undefined} makeId - The ID of the make to find.
 * @returns {Promise<Make | null>} A promise resolving to the found `Make` object or null if not found or ID is invalid.
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
 * Finds a vehicle model by its ID.
 *
 * @param {number | null | undefined} modelId - The ID of the model to find.
 * @returns {Promise<Model | null>} A promise resolving to the found `Model` object or null if not found or ID is invalid.
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
 * Finds a vehicle model variant by its ID.
 *
 * @param {number | null | undefined} modelVariantId - The ID of the model variant to find.
 * @returns {Promise<ModelVariant | null>} A promise resolving to the found `ModelVariant` object or null if not found or ID is invalid.
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
 * @param {number | string | undefined} year - The vehicle manufacturing year.
 * @param {Make | null} make - The vehicle make object or null.
 * @param {Model | null} model - The vehicle model object or null.
 * @param {ModelVariant | null} modelVariant - The vehicle model variant object, or null if not applicable.
 * @returns {string} The generated title string.
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
 * Generates a URL-friendly slug for a classified listing based on title and VRM.
 *
 * @param {string} title - The listing title.
 * @param {string | undefined} vrm - The vehicle registration mark (optional).
 * @returns {string} The generated URL-friendly slug string.
 */
const generateSlug = (title: string, vrm: string | undefined): string => {
  return slugify(`${title} ${vrm || ''}`)
}

/**
 * Processes an array of image source URLs for a classified listing.
 *
 * For each image source, it generates a ThumbHash Data URI placeholder.
 * It prepares an array of data objects suitable for creating `Image` records in the database,
 * including setting the `isMain` flag for the first image.
 *
 * @param {Array<{ src: string }>} images - An array of objects, each containing an image source URL (`src`).
 * @param {number} classifiedId - The ID of the classified listing these images belong to.
 * @param {string} title - The title of the classified listing, used for generating alt text.
 * @returns {Promise<Array<Omit<import('@prisma/client').Image, 'id'>>>} A promise resolving to an array of processed image data objects, ready for `prisma.image.createMany`.
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
 * Updates a classified listing and its associated images within a database transaction.
 *
 * This function ensures atomicity for the update operation:
 * 1. Deletes all existing images associated with the classified ID.
 * 2. Processes the new image URLs using `processImages`.
 * 3. Creates the new image records in the database.
 * 4. Updates the classified record itself with the new data (title, slug, details, etc.)
 *    and links the newly created images.
 *
 * @param {UpdateClassifiedType} data - The complete updated data for the classified, including the ID and new images array.
 * @param {string} slug - The newly generated URL-friendly slug.
 * @param {string} title - The newly generated listing title.
 * @param {number} makeId - The ID of the associated make.
 * @param {number} modelId - The ID of the associated model.
 * @param {number | null} modelVariantId - The ID of the associated model variant, or null.
 * @returns {Promise<[import('@prisma/client').Classified, Array<import('@prisma/client').Image>]>} A promise resolving to a tuple containing the updated `Classified` record and an array of the newly created `Image` records.
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
 * Updates an existing classified advertisement listing.
 *
 * This is the main server action for updating a classified listing. It performs the following steps:
 * 1. Verifies user authentication.
 * 2. Finds the necessary taxonomy data (make, model, variant) based on IDs provided in the input data.
 * 3. Generates an updated title and slug based on the new details.
 * 4. Executes the core update logic within a database transaction using `updateClassifiedWithTransaction`,
 *    which handles image deletion/creation and updates the classified record.
 * 5. If the transaction is successful, revalidates the admin classifieds path cache (`routes.admin.classifieds`).
 * 6. Returns a structured response indicating success or failure.
 *
 * Handles errors during the process and returns a structured response.
 * Used primarily in the admin dashboard for editing existing vehicle listings.
 *
 * @param {UpdateClassifiedType} data - An object containing the updated data for the classified listing, including its ID.
 * @returns {Promise<{
 *   success: boolean;
 *   data?: { classified: import('@prisma/client').Classified; images: Array<import('@prisma/client').Image> } | null;
 *   message?: string;
 *   error?: string;
 * }>} A promise resolving to an object indicating the outcome:
 *   - On success: `{ success: true, data: { classified: Classified, images: Image[] } }`
 *   - On failure (e.g., auth error, DB transaction error): `{ success: false, error: string, message?: string }`
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
