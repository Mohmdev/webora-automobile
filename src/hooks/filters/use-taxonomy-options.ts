'use client'

import { endpoints } from '@/config/endpoints'
import { api } from '@/lib/api-client'
import type { FilterOptions } from '@/types'
import { useQuery } from '@tanstack/react-query'

export interface TaxonomyResponse {
  makes: FilterOptions<string, string>
  models: FilterOptions<string, string>
  modelVariants: FilterOptions<string, string>
}

export interface TaxonomyOptionsState {
  makes: FilterOptions<string, string>
  models: FilterOptions<string, string>
  modelVariants: FilterOptions<string, string>
  isLoading: boolean
  error: Error | null
}

export function useTaxonomyOptions(
  searchParams: Record<string, string> | undefined
): TaxonomyOptionsState {
  const fetchTaxonomyData = () => {
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

    return api.get<TaxonomyResponse>(url.toString())
  }

  const { data, isLoading, error } = useQuery({
    queryKey: ['taxonomy', searchParams?.make, searchParams?.model],
    queryFn: fetchTaxonomyData,
    enabled: !!searchParams,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })

  // Simplify error handling to avoid nested ternary
  let processedError: Error | null = null
  if (error instanceof Error) {
    processedError = error
  } else if (error) {
    processedError = new Error('Failed to fetch taxonomy data')
  }

  return {
    makes: data?.makes || [],
    models: data?.models || [],
    modelVariants: data?.modelVariants || [],
    isLoading,
    error: processedError,
  }
}
