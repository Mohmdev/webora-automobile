import type { GenerativeStreamProps } from '@/components/admin/classifieds/generative-stream'
import type { ClassifiedTaxonomyAISchema } from '@/schemas/classified-ai.schema'
import type { z } from 'zod'

/**
 * Generates a standardized vehicle title based on taxonomy data
 *
 * Creates a concise, descriptive title for the vehicle using the
 * year, make, model, and variant information from the taxonomy data.
 * Formats the title in a consistent "Year Make Model Variant" format
 * when all information is available, omitting any missing components.
 *
 * @param taxonomy - The vehicle taxonomy data from AI analysis
 * @param classified - Current classified data object (unused but kept for API consistency)
 * @returns A formatted vehicle title string
 */
export function generateClassifiedTitleWithTaxonomy(
  taxonomy: z.infer<typeof ClassifiedTaxonomyAISchema>,
  _classified: GenerativeStreamProps
): string {
  const parts = getTitleParts(taxonomy)
  return parts.join(' ').trim()
}

/**
 * Extracts and formats individual components for the vehicle title
 *
 * Processes the taxonomy data to extract year, make, model, and variant
 * information, validates each component, and formats them into an array
 * of title parts ready to be joined into a complete title.
 *
 * Handles special cases like:
 * - Ensuring year is a valid number
 * - Filtering out placeholder variant values ("-")
 *
 * @param taxonomy - The vehicle taxonomy data from AI analysis
 * @returns An array of title components in display order
 */
function getTitleParts(taxonomy: z.infer<typeof ClassifiedTaxonomyAISchema>) {
  const titleParts: string[] = []

  // Add year if valid
  if (taxonomy.year && taxonomy.year > 0) {
    titleParts.push(taxonomy.year.toString())
  }

  // Add make if present
  if (taxonomy.make) {
    titleParts.push(taxonomy.make)
  }

  // Add model if present
  if (taxonomy.model) {
    titleParts.push(taxonomy.model)
  }

  // Add modelVariant if valid
  if (taxonomy.modelVariant && taxonomy.modelVariant !== '-') {
    titleParts.push(taxonomy.modelVariant)
  }

  return titleParts
}
