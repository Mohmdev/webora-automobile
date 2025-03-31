'use client'

import { RangeFilter } from '@/components/filters/ui/range-filters'
import { getMinMaxValues } from '@/data/catalog'
import { useSidebarFilters } from '@/hooks/filters/useSidebarFilters'
import type { ParamsAwaitedProps } from '@/types'
import { useQuery } from '@tanstack/react-query'

type YearFilterProps = ParamsAwaitedProps

export function YearFilter({ searchParams }: YearFilterProps) {
  const { data: minMaxValues } = useQuery({
    queryKey: ['minMaxValues'],
    queryFn: getMinMaxValues,
  })

  const { handleChange } = useSidebarFilters(
    searchParams as Record<string, string>
  )

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
