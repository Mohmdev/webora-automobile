import { routes } from '@/config/routes'
import { env } from '@/env'
import { useRouter } from 'next/navigation'
import { parseAsString, useQueryStates } from 'nuqs'
import { type ChangeEvent, useEffect, useState } from 'react'

export interface FilterState {
  queryStates: Record<string, string>
  filterCount: number
  clearFilters: () => void
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
  handleSelectChange: (name: string, value: string) => void
}

export function useFilterStates(
  searchParams: Record<string, string> | undefined
): FilterState {
  const [filterCount, setFilterCount] = useState(0)
  const router = useRouter()

  const [queryStates, setQueryStates] = useQueryStates(
    {
      make: parseAsString.withDefault(''),
      model: parseAsString.withDefault(''),
      modelVariant: parseAsString.withDefault(''),
      minYear: parseAsString.withDefault(''),
      maxYear: parseAsString.withDefault(''),
      minPrice: parseAsString.withDefault(''),
      maxPrice: parseAsString.withDefault(''),
      minReading: parseAsString.withDefault(''),
      maxReading: parseAsString.withDefault(''),
      currency: parseAsString.withDefault(''),
      odoUnit: parseAsString.withDefault(''),
      transmission: parseAsString.withDefault(''),
      fuelType: parseAsString.withDefault(''),
      bodyType: parseAsString.withDefault(''),
      colour: parseAsString.withDefault(''),
      doors: parseAsString.withDefault(''),
      seats: parseAsString.withDefault(''),
      ulezCompliance: parseAsString.withDefault(''),
    },
    {
      shallow: false,
    }
  )

  useEffect(() => {
    if (!searchParams) {
      return
    }

    const count = Object.entries(searchParams).filter(
      ([key, value]) => key !== 'page' && value
    ).length

    setFilterCount(count)
  }, [searchParams])

  const clearFilters = () => {
    const url = new URL(routes.inventory, env.NEXT_PUBLIC_APP_URL)
    router.replace(url.toString())
    setFilterCount(0)
  }

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target

    setQueryStates({
      [name]: value || null,
    })

    if (name === 'make') {
      setQueryStates({
        model: null,
        modelVariant: null,
      })
    }

    router.refresh()
  }

  const handleSelectChange = (name: string, value: string) => {
    setQueryStates({
      [name]: value || null,
    })

    if (name === 'make') {
      setQueryStates({
        model: null,
        modelVariant: null,
      })
    }

    router.refresh()
  }

  return {
    queryStates,
    filterCount,
    clearFilters,
    handleChange,
    handleSelectChange,
  }
}
