import { endpoints } from '@/config/endpoints'
import { api } from '@/lib/api-client'
import type { FilterOptions } from '@/types'

export interface TaxonomyResponse {
  makes: FilterOptions<string, string>
  models: FilterOptions<string, string>
  modelVariants: FilterOptions<string, string>
}

/**
 * Fetches taxonomy data (makes, models, model variants) from the API based on provided search parameters.
 *
 * This function constructs a URL with the given search parameters and sends a GET request
 * to the taxonomy endpoint. It returns the taxonomy data structured as FilterOptions.
 * If no search parameters are provided, it returns empty arrays for makes, models, and model variants.
 *
 * @param {Record<string, string> | undefined} searchParams - The search parameters to filter the taxonomy data.
 * @returns {Promise<TaxonomyResponse>} A promise that resolves to the taxonomy data.
 */
export async function fetchTaxonomyDataFromApi(
  searchParams: Record<string, string> | undefined
) {
  if (!searchParams) {
    return {
      makes: [],
      models: [],
      modelVariants: [],
    }
  }

  const params = new URLSearchParams()
  for (const [k, v] of Object.entries(searchParams)) {
    if (v) {
      params.set(k, v)
    }
  }

  const url = new URL(endpoints.taxonomy, window.location.href)
  url.search = params.toString()

  const response = await api.get<TaxonomyResponse>(url.toString())

  return response
}
