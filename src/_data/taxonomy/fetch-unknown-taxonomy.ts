import { prisma } from '@/lib/prisma'

/**
 * Fetches the UNKNOWN make and model for fallback in vehicle classification
 *
 * This utility function retrieves the special "UNKNOWN" make and model records
 * that are used as fallbacks when vehicle classification cannot determine
 * the actual make and model. This is important for maintaining data integrity
 * by avoiding null references in the database.
 *
 * Used in AI classification workflows and data import processes when
 * vehicle makes and models cannot be properly identified.
 *
 * @returns Object containing UNKNOWN make and model, or null values if not found
 */
export async function fetchUnknownTaxonomy() {
  try {
    const unknownMake = await prisma.make.findFirst({
      where: { name: 'UNKNOWN' },
    })

    if (!unknownMake) {
      console.error('UNKNOWN make not found in database')
      return { make: null, model: null }
    }

    const unknownModel = await prisma.model.findFirst({
      where: {
        makeId: unknownMake.id,
        name: 'UNKNOWN',
      },
    })

    if (!unknownModel) {
      console.error('UNKNOWN model not found for UNKNOWN make')
      return { make: unknownMake, model: null }
    }

    return {
      make: unknownMake,
      model: unknownModel,
    }
  } catch (error) {
    console.error('Error finding UNKNOWN make/model:', error)
    return { make: null, model: null }
  }
}
