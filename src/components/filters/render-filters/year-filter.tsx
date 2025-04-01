'use client'

import { fetchMinMaxValues } from '@/_data'
import { RangeFilter } from '@/components/filters/ui/range-filters'
import { useFilters } from '@/hooks/filters/use-filters'
import type { ParamsAwaitedProps } from '@/types'
import { useQuery } from '@tanstack/react-query'

type YearFilterProps = ParamsAwaitedProps

export function YearFilter({ searchParams }: YearFilterProps) {
  const { data: minMaxValues } = useQuery({
    queryKey: ['minMaxValues'],
    queryFn: fetchMinMaxValues,
  })

  const { handleChange } = useFilters(searchParams as Record<string, string>)

  return (
    <RangeFilter
      label="Year"
      minName="minYear"
      maxName="maxYear"
      defaultMin={minMaxValues?._min.year ?? 1925}
      defaultMax={minMaxValues?._max.year ?? new Date().getFullYear()}
      handleChange={handleChange}
      searchParams={searchParams}
    />
  )
}
