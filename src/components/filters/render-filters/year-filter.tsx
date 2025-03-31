'use client'

import type { QueryReturnMetaProps } from '@/_data/catalog'
import { RangeFilter } from '@/components/filters/ui/range-filters'
import { useSidebarFilters } from '@/hooks/filters/useSidebarFilters'
import type { ParamsAwaitedProps } from '@/types'

type YearFilterProps = QueryReturnMetaProps & ParamsAwaitedProps

export function YearFilter({ minMaxValues, searchParams }: YearFilterProps) {
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
