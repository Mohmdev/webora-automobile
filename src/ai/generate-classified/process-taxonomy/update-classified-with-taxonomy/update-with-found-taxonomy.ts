import { fetchMakeById } from '@/_data'
import type { GenerativeStreamProps } from '@/components/admin/classifieds/generative-stream'
import type { findOrCreateVehicleTaxonomy } from './find-or-create-taxonomy'

/**
 * Updates classified data with found taxonomy information
 *
 * This function:
 * 1. Retrieves the complete make information from the database
 * 2. Merges the taxonomy data with the classified data
 * 3. Preserves the original classified data if make retrieval fails
 *
 * Ensures that all taxonomy information in the classified listing
 * reflects accurate database records with complete make details.
 *
 * @param foundTaxonomy - The vehicle taxonomy information found in or created in the database
 * @param classified - Current classified data object
 * @returns Updated classified data with complete taxonomy information
 */
export async function updateWithFoundTaxonomy(
  foundTaxonomy: NonNullable<
    Awaited<ReturnType<typeof findOrCreateVehicleTaxonomy>>
  >,
  classified: GenerativeStreamProps
): Promise<GenerativeStreamProps> {
  const make = await fetchMakeById(foundTaxonomy.makeId)

  if (make) {
    return {
      ...classified,
      ...foundTaxonomy,
      make,
      makeId: make.id,
    }
  }

  return classified
}
