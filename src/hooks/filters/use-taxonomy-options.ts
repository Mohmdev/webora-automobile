'use client'

import { fetchTaxonomyDataFromApi } from '@/_data'
import type { FilterOptions } from '@/types'
import { useQuery } from '@tanstack/react-query'

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
  const { data, isLoading, error } = useQuery({
    queryKey: ['taxonomy', searchParams?.make, searchParams?.model],
    queryFn: () => fetchTaxonomyDataFromApi(searchParams),
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
