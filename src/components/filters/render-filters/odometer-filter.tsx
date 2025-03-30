'use client'

import { RangeFilter } from '@/components/filters/ui/range-filters'
import { useSidebarFilters } from '@/hooks/filters/useSidebarFilters'
import type { MinMaxProps, ParamsAwaitedProps } from '@/types'

export function OdometerFilter({
  minMaxValues,
  searchParams,
}: MinMaxProps & ParamsAwaitedProps) {
  const { handleChange } = useSidebarFilters(
    searchParams as Record<string, string>
  )
  const { _min, _max } = minMaxValues

  return (
    <RangeFilter
      label="Odometer Reading"
      minName="minReading"
      maxName="maxReading"
      defaultMin={_min.odoReading || 0}
      defaultMax={_max.odoReading || 1000000}
      handleChange={handleChange}
      searchParams={searchParams}
      increment={5000}
      thousandSeparator
    />
  )
}
