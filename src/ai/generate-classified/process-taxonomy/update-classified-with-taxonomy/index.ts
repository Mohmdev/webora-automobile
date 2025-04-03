import type { GenerativeStreamProps } from '@/components/admin/classifieds/generative-stream'
import type { ClassifiedTaxonomyAISchema } from '@/schemas/classified-ai.schema'
import type { z } from 'zod'
import { fallbackToUnknownTaxonomy } from './fallback-to-unknown-taxonomy'
import { findOrCreateVehicleTaxonomy } from './find-or-create-taxonomy'
import { updateWithFoundTaxonomy } from './update-with-found-taxonomy'

/**
 * Updates classified data with taxonomy information from the database
 *
 * This function:
 * 1. Attempts to find or create taxonomy records based on AI-detected taxonomy
 * 2. Updates the classified data with found taxonomy information if successful
 * 3. Falls back to unknown taxonomy if no matching taxonomy can be found or created
 *
 * Serves as a coordinator between AI taxonomy detection and database operations,
 * ensuring the classified listing has valid taxonomy references.
 *
 * @param taxonomy - Vehicle taxonomy data from AI analysis
 * @param classified - Current classified data object
 * @returns Updated classified data with database-backed taxonomy information
 */
export async function updateClassifiedWithTaxonomy(
  taxonomy: z.infer<typeof ClassifiedTaxonomyAISchema>,
  classified: GenerativeStreamProps
): Promise<GenerativeStreamProps> {
  const foundTaxonomy = await findOrCreateVehicleTaxonomy({
    year: taxonomy.year,
    make: taxonomy.make,
    model: taxonomy.model,
    modelVariant: taxonomy.modelVariant,
  })

  if (foundTaxonomy) {
    return await updateWithFoundTaxonomy(foundTaxonomy, classified)
  }

  return await fallbackToUnknownTaxonomy(classified)
}
