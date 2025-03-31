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

  return (
    <RangeFilter
      label="Odometer Reading"
      minName="minReading"
      maxName="maxReading"
      defaultMin={minMaxValues?._min.odoReading || 0}
      defaultMax={minMaxValues?._max.odoReading || 1000000}
      handleChange={handleChange}
      searchParams={searchParams}
      increment={5000}
      thousandSeparator
    />
  )
}
