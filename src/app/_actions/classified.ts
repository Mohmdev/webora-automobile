'use server'

import { randomInt } from 'node:crypto'
import { auth } from '@/auth'
import type { StreamableSkeletonProps } from '@/components/admin/classifieds/streamable-skeleton'
import { routes } from '@/config/routes'
import { prisma } from '@/lib/prisma'
import { generateThumbHashFromSrcUrl } from '@/lib/thumbhash-server'
import { CurrencyCode } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { forbidden, redirect } from 'next/navigation'
import slugify from 'slugify'
import { createPngDataUri } from 'unlazy/thumbhash'
import type { UpdateClassifiedType } from '../schemas/classified.schema'

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

export const updateClassifiedAction = async (data: UpdateClassifiedType) => {
  const session = await auth()
  if (!session) {
    forbidden()
  }

  let success = false

  try {
    const makeId = Number(data.make)
    const modelId = Number(data.model)
    const modelVariantId = data.modelVariant ? Number(data.modelVariant) : null

    const make = await prisma.make.findUnique({
      where: { id: makeId as number },
    })

    const model = await prisma.model.findUnique({
      where: { id: modelId as number },
    })

    // Create a filtered array of title parts
    const updateTitleParts = [
      data.year && Number(data.year) > 0 ? data.year.toString() : null,
      make?.name !== 'UNKNOWN' ? make?.name : null,
      model?.name !== 'UNKNOWN' ? model?.name : null,
    ].filter((part) => part && part.trim().length > 0)

    let title = updateTitleParts.join(' ').trim()

    if (modelVariantId) {
      const modelVariant = await prisma.modelVariant.findUnique({
        where: { id: modelVariantId },
      })

      if (
        modelVariant &&
        modelVariant.name !== '-' &&
        modelVariant.name !== 'UNKNOWN'
      ) {
        title = `${title} ${modelVariant.name}`.trim()
      }
    }

    const slug = slugify(`${title} ${data.vrm}`)

    const [classified, images] = await prisma.$transaction(
      async (prisma) => {
        await prisma.image.deleteMany({
          where: { classifiedId: data.id },
        })

        const imagesData = await Promise.all(
          data.images.map(async ({ src }, index) => {
            const hash = await generateThumbHashFromSrcUrl(data.images[0].src)
            const uri = createPngDataUri(hash)
            return {
              classifiedId: data.id,
              isMain: !index,
              blurhash: uri,
              src,
              alt: `${title} ${index + 1}`,
            }
          })
        )

        const images = await prisma.image.createManyAndReturn({
          data: imagesData,
        })

        const classified = await prisma.classified.update({
          where: { id: data.id },
          data: {
            slug,
            title,
            year: Number(data.year),
            makeId,
            modelId,
            ...(modelVariantId && { modelVariantId }),
            vrm: data.vrm,
            price: data.price * 100,
            currency: data.currency,
            odoReading: data.odoReading,
            odoUnit: data.odoUnit,
            fuelType: data.fuelType,
            bodyType: data.bodyType,
            transmission: data.transmission,
            colour: data.colour,
            ulezCompliance: data.ulezCompliance,
            description: data.description,
            doors: data.doors,
            seats: data.seats,
            status: data.status,
            images: { set: images.map((image) => ({ id: image.id })) },
          },
        })

        return [classified, images]
      },
      { timeout: 10000 }
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

export const deleteClassifiedAction = async (id: number) => {
  try {
    await prisma.classified.delete({ where: { id } })
    revalidatePath(routes.admin.classifieds)
    return { success: true, message: 'Classified deleted' }
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, message: error.message }
    }
    return { success: false, message: 'Something went wrong' }
  }
}
