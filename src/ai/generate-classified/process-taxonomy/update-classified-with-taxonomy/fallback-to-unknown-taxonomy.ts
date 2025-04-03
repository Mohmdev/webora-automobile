import { fetchUnknownTaxonomy } from '@/_data'
import type { GenerativeStreamProps } from '@/components/admin/classifieds/generative-stream'

/**
 * Provides fallback taxonomy data when vehicle identification fails
 *
 * This function:
 * 1. Retrieves the "UNKNOWN" make and model from the database
 * 2. Updates the classified data with these fallback values
 * 3. Preserves the original classified data if fallback retrieval fails
 *
 * Acts as a safety mechanism to ensure vehicle listings always have
 * valid taxonomy references even when AI identification is inconclusive.
 *
 * @param classified - Current classified data object
 * @returns Updated classified data with unknown taxonomy information
 */
export async function fallbackToUnknownTaxonomy(
  classified: GenerativeStreamProps
): Promise<GenerativeStreamProps> {
  try {
    const { make: unknownMake, model: unknownModel } =
      await fetchUnknownTaxonomy()

    if (unknownMake && unknownModel) {
      return {
        ...classified,
        make: unknownMake,
        makeId: unknownMake.id,
        modelId: unknownModel.id,
      }
    }
  } catch (error) {
    console.error('Error finding UNKNOWN make/model:', error)
  }

  return classified
}
