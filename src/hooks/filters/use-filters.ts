'use client'

import { env } from '@/env'
import { usePathname, useRouter } from 'next/navigation'
import { parseAsString, useQueryStates } from 'nuqs'
import { type ChangeEvent, useEffect, useState } from 'react'

export function useFilters(searchParams: Record<string, string> | undefined) {
  const router = useRouter()
  const pathname = usePathname()
  const [filterCount, setFilterCount] = useState(0)

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
    const count = Object.entries(searchParams as Record<string, string>).filter(
      ([key, value]) => key !== 'page' && value
    ).length

    setFilterCount(count)
  }, [searchParams])

  const clearFilters = () => {
    const url = new URL(pathname, env.NEXT_PUBLIC_APP_URL)
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

      // Invalidate relevant queries when make changes
      // queryClient.invalidateQueries({ queryKey: ['taxonomy'] })
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

      // Invalidate relevant queries when make changes
      // queryClient.invalidateQueries({ queryKey: ['taxonomy'] })
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
