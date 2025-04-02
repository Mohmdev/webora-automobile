import { prisma } from '@/lib/prisma'
import type { ModelVariant } from '@prisma/client'

interface MapToTaxonomyOrCreateType {
  year: number
  make: string
  model: string
  modelVariant: string | null
}

/**
 * Maps vehicle information to existing taxonomy or creates new records
 *
 * This function attempts to match provided vehicle information (make, model, variant)
 * to existing taxonomy records in the database. If matches aren't found, it will
 * create new records when possible or fall back to "UNKNOWN" placeholders to
 * maintain referential integrity.
 *
 * Process:
 * 1. Attempts to find the make (case-insensitive)
 * 2. Falls back to "UNKNOWN" make if not found
 * 3. Attempts to find the model within that make
 * 4. Creates a new model if not found, or falls back to "UNKNOWN" model
 * 5. Optionally finds or creates a model variant if provided
 *
 * Used in vehicle classification workflows, data imports, and AI-powered
 * vehicle identification processes.
 *
 * @param object Object containing vehicle year, make, model and optional modelVariant
 * @returns Mapped taxonomy data with IDs, or null if critical lookups fail
 */
export async function mapToTaxonomyOrCreate(object: MapToTaxonomyOrCreateType) {
  // attempt to find the make
  let make = await prisma.make.findFirst({
    where: { name: { equals: object.make, mode: 'insensitive' } },
  })

  // If make not found, fallback to UNKNOWN
  if (!make) {
    make = await prisma.make.findFirst({
      where: { name: { equals: 'UNKNOWN', mode: 'insensitive' } },
    })

    if (!make) {
      return null
    }
  }

  // attempt to find the model
  let model = await prisma.model.findFirst({
    where: {
      makeId: make.id,
      name: { contains: object.model, mode: 'insensitive' },
    },
  })

  if (!model) {
    // Try to create the model
    try {
      model = await prisma.$transaction(async (prisma) => {
        await prisma.$executeRaw`LOCK TABLE "models" IN EXCLUSIVE MODE`
        return prisma.model.create({
          data: {
            name: object.model,
            make: { connect: { id: make.id } },
          },
        })
      })
    } catch (_error) {
      // If model creation fails, fallback to UNKNOWN model for this make
      model = await prisma.model.findFirst({
        where: {
          makeId: make.id,
          name: { equals: 'UNKNOWN', mode: 'insensitive' },
        },
      })
    }
  }

  if (!model) {
    return null
  }

  let modelVariant: ModelVariant | null = null

  if (object.modelVariant) {
    // attempt to find the model variant
    modelVariant = await prisma.modelVariant.findFirst({
      where: {
        modelId: model.id,
        name: { contains: object.modelVariant, mode: 'insensitive' },
      },
    })

    if (!modelVariant) {
      try {
        modelVariant = await prisma.$transaction(async (prisma) => {
          await prisma.$executeRaw`LOCK TABLE "model_variants" IN EXCLUSIVE MODE`
          return prisma.modelVariant.create({
            data: {
              name: object.modelVariant as string,
              model: { connect: { id: model.id } },
              yearStart: object.year,
              yearEnd: object.year,
            },
          })
        })
      } catch (_error) {
        // No need to set a fallback for model variant as it's optional
      }
    }
  }

  return {
    year: object.year,
    make: make.name,
    model: model.name,
    modelVariant: modelVariant?.name || null,
    makeId: make.id,
    modelId: model.id,
    modelVariantId: modelVariant?.id || null,
  }
}
