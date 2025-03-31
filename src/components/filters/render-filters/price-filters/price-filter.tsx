'use client'

import { RangeFilter } from '@/components/filters/ui/range-filters'
import { useSidebarFilters } from '@/hooks/filters/useSidebarFilters'
import type { MinMaxProps, ParamsAwaitedProps } from '@/types'

export function PriceFilter({
  minMaxValues,
  searchParams,
}: ParamsAwaitedProps & MinMaxProps) {
  const { handleChange } = useSidebarFilters(
    searchParams as Record<string, string>
  )

  return (
    <RangeFilter
      label="Price"
      minName="minPrice"
      maxName="maxPrice"
      defaultMin={minMaxValues?._min.price || 0}
      defaultMax={minMaxValues?._max.price || 21474836}
      handleChange={handleChange}
      searchParams={searchParams}
      increment={1000000}
      thousandSeparator
      currency={{
        currencyCode: 'GBP',
      }}
    />
  )
}
