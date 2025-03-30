'use client'

import { RangeFilter } from '@/components/filters/ui/range-filters'
import { useSidebarFilters } from '@/hooks/filters/useSidebarFilters'
import type { MinMaxProps, ParamsAwaitedProps } from '@/types'

interface YearFilterProps {
  minMaxValues: MinMaxProps['minMaxValues']
  searchParams: ParamsAwaitedProps['searchParams']
}

export function YearFilter({ minMaxValues, searchParams }: YearFilterProps) {
  const { handleChange } = useSidebarFilters(
    searchParams as Record<string, string>
  )
  const { _min, _max } = minMaxValues

  return (
    <RangeFilter
      label="Year"
      minName="minYear"
      maxName="maxYear"
      defaultMin={_min.year || 1925}
      defaultMax={_max.year || new Date().getFullYear()}
      handleChange={handleChange}
      searchParams={searchParams}
    />
  )
}
