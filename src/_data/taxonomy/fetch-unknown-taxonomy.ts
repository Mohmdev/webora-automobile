import { prisma } from '@/lib/prisma'

/**
 * Fetches the special 'UNKNOWN' make and associated 'UNKNOWN' model records.
 *
 * This utility function retrieves the specific make and model records designated as 'UNKNOWN'
 * in the database. These are crucial as fallbacks in processes like AI vehicle classification
 * or data imports where the actual make/model cannot be determined, ensuring data integrity
 * by preventing null foreign key references.
 *
 * It first finds the 'UNKNOWN' make, then finds the 'UNKNOWN' model specifically linked to that make.
 * Logs errors if either the 'UNKNOWN' make or its associated 'UNKNOWN' model cannot be found.
 *
 * @returns {Promise<{ make: import('@prisma/client').Make | null; model: import('@prisma/client').Model | null; }>} A promise resolving to an object containing:
 *   - `make`: The 'UNKNOWN' Make record, or null if not found.
 *   - `model`: The 'UNKNOWN' Model record associated with the 'UNKNOWN' make, or null if the make or model is not found.
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
