import { endpoints } from '@/config/endpoints'
import { api } from '@/lib/api-client'
import type { FilterOptions } from '@/types'
import { useEffect, useState } from 'react'

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
  const [makes, setMakes] = useState<FilterOptions<string, string>>([])
  const [models, setModels] = useState<FilterOptions<string, string>>([])
  const [modelVariants, setModelVariants] = useState<
    FilterOptions<string, string>
  >([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!searchParams) {
      return
    }

    const fetchTaxonomyData = async () => {
      setIsLoading(true)
      setError(null)

      const params = new URLSearchParams()
      for (const [k, v] of Object.entries(searchParams)) {
        if (v) {
          params.set(k, v)
        }
      }

      const url = new URL(endpoints.taxonomy, window.location.href)
      url.search = params.toString()

      try {
        const data = await api.get<{
          makes: FilterOptions<string, string>
          models: FilterOptions<string, string>
          modelVariants: FilterOptions<string, string>
        }>(url.toString())

        setMakes(data.makes)
        setModels(data.models)
        setModelVariants(data.modelVariants)
      } catch (error) {
        console.error('Error fetching taxonomy data:', error)
        setError(
          error instanceof Error
            ? error
            : new Error('Failed to fetch taxonomy data')
        )
      } finally {
        setIsLoading(false)
      }
    }

    fetchTaxonomyData()
  }, [searchParams])

  return {
    makes,
    models,
    modelVariants,
    isLoading,
    error,
  }
}
