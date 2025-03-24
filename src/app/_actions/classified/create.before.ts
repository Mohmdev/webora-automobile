'use server'

import { randomInt } from 'node:crypto'
import { auth } from '@/auth'
import type { StreamableSkeletonProps } from '@/components/admin/classifieds/streamable-skeleton'
import { routes } from '@/config/routes'
import { prisma } from '@/lib/prisma'
import { generateThumbHashFromSrcUrl } from '@/lib/thumbhash-server'
import { CurrencyCode } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import slugify from 'slugify'
import { createPngDataUri } from 'unlazy/thumbhash'

export const createClassifiedAction = async (data: StreamableSkeletonProps) => {
  const session = await auth()
  if (!session) {
    return { success: false, error: 'Unauthorized' }
  }
  let success = false
  let classifiedId: number | null = null

  try {
    // If make isn't provided or found, try to find the "UNKNOWN" make
    let make = data.makeId
      ? await prisma.make.findUnique({ where: { id: data.makeId as number } })
      : null

    if (!make) {
      make = await prisma.make.findFirst({ where: { name: 'UNKNOWN' } })
      if (!make) {
        return {
          success: false,
          error: 'Make not found and no UNKNOWN make available as fallback',
        }
      }
    }

    // If model isn't provided or found, try to find the "UNKNOWN" model for this make
    let model = data.modelId
      ? await prisma.model.findUnique({ where: { id: data.modelId as number } })
      : null

    if (!model) {
      model = await prisma.model.findFirst({
        where: {
          makeId: make.id,
          name: 'UNKNOWN',
        },
      })
      if (!model) {
        return {
          success: false,
          error: 'Model not found and no UNKNOWN model available as fallback',
        }
      }
    }

    // Create a filtered array of title parts
    const createTitleParts = [
      data.year && data.year > 0 ? data.year.toString() : null,
      make.name !== 'UNKNOWN' ? make.name : null,
      model.name !== 'UNKNOWN' ? model.name : null,
    ].filter((part) => part && part.trim().length > 0)

    let title = createTitleParts.join(' ').trim()

    let modelVariant: { id: number; name: string } | null = null
    if (data?.modelVariantId) {
      modelVariant = await prisma.modelVariant.findUnique({
        where: { id: data.modelVariantId as number },
      })

      if (
        modelVariant &&
        modelVariant.name !== '-' &&
        modelVariant.name !== 'UNKNOWN'
      ) {
        title = `${title} ${modelVariant.name}`.trim()
      }
    }

    let slug = slugify(`${title} ${data.vrm ?? randomInt(100000, 999999)}`)

    const slugLikeFound = await prisma.classified.count({
      where: { slug: { contains: slug, mode: 'insensitive' } },
    })

    if (slugLikeFound) {
      slug = slugify(`${title} ${data.vrm} ${slugLikeFound + 1}`)
    }

    const thumbhash = await generateThumbHashFromSrcUrl(data.image as string)
    const uri = createPngDataUri(thumbhash)

    const classified = await prisma.classified.create({
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
            blurhash: uri,
            src: data.image as string,
            alt: title,
          },
        },
      },
    })

    if (classified) {
      classifiedId = classified.id
      success = true
    }
  } catch (error) {
    return { success: false, message: `Something went wrong: ${error}` }
  }

  if (success && classifiedId) {
    revalidatePath(routes.admin.classifieds)
    redirect(routes.admin.editClassified(classifiedId))
  } else {
    return { success: false, message: 'Failed to create classified' }
  }
}
