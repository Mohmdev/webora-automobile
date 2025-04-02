import { endpoints } from '@/config/endpoints'
import { api } from '@/lib/api-client'
import type { FilterOptions } from '@/types'

export interface TaxonomyResponse {
  makes: FilterOptions<string, string>
  models: FilterOptions<string, string>
  modelVariants: FilterOptions<string, string>
}

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
