'use server'

import { randomInt } from 'node:crypto'
import { auth } from '@/auth'
import type { StreamableSkeletonProps } from '@/components/admin/classifieds/streamable-skeleton'
import { routes } from '@/config/routes'
import { prisma } from '@/lib/prisma'
import { generateThumbHashFromSrcUrl } from '@/lib/thumbhash-server'
import {
  CurrencyCode,
  type Make,
  type Model,
  type ModelVariant,
} from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import slugify from 'slugify'
import { createPngDataUri } from 'unlazy/thumbhash'

// Results type for the finder functions
type FindResult<_TypeOfOutcome> = {
  success: boolean
  make?: Make
  model?: Model
  error?: string
  message?: string
}

// Helper function to find make
const findMake = async (
  makeId: number | null | undefined
): Promise<FindResult<Make>> => {
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

// Helper function to find model
const findModel = async (
  modelId: number | null | undefined,
  makeId: number
): Promise<FindResult<Model>> => {
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
  year: number | undefined,
  make: Make,
  model: Model,
  modelVariant: ModelVariant | null
): string => {
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

// Helper function to generate slug
const generateSlug = async (
  title: string,
  vrm: string | undefined
): Promise<string> => {
  let slug = slugify(`${title} ${vrm ?? randomInt(100000, 999999)}`)

  const slugLikeFound = await prisma.classified.count({
    where: { slug: { contains: slug, mode: 'insensitive' } },
  })

  if (slugLikeFound) {
    slug = slugify(`${title} ${vrm} ${slugLikeFound + 1}`)
  }

  return slug
}

// Helper function to create classified
const createClassified = async (
  data: StreamableSkeletonProps,
  slug: string,
  title: string,
  make: Make,
  model: Model,
  modelVariant: ModelVariant | null,
  thumbhashUri: string
) => {
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
      odoUnit: data.odoUnit ?? 'KILOMETERS',
      fuelType: data.fuelType ?? 'PETROL',
      bodyType: data.bodyType ?? 'SEDAN',
      colour: data.colour ?? 'BLACK',
      transmission: data.transmission ?? 'MANUAL',
      ulezCompliance: data.ulezCompliance ?? 'EXEMPT',
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

export const createClassifiedAction = async (data: StreamableSkeletonProps) => {
  let success = false
  let classifiedId: number | null = null

  const session = await auth()
  if (!session) {
    return { success: false, error: 'Unauthorized', message: 'Unauthorized' }
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
    const title = generateTitle(data.year, make, model, modelVariant)

    // Generate slug
    const slug = await generateSlug(title, data.vrm)

    // Generate thumbhash
    const thumbhash = await generateThumbHashFromSrcUrl(data.image as string)
    const uri = createPngDataUri(thumbhash)

    // Create classified
    const classified = await createClassified(
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
    }
  } catch (error) {
    return {
      success: false,
      message: `Something went wrong: ${error}`,
      error: `Something went wrong: ${error}`,
    }
  }

  if (success && classifiedId) {
    revalidatePath(routes.admin.classifieds)
    redirect(routes.admin.editClassified(classifiedId))
  } else {
    return {
      success: false,
      message: 'Failed to create classified',
      error: 'Failed to create classified',
    }
  }
}
