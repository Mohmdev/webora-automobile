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
  const { _min, _max } = minMaxValues

  return (
    <RangeFilter
      label="Price"
      minName="minPrice"
      maxName="maxPrice"
      defaultMin={_min.price || 0}
      defaultMax={_max.price || 21474836}
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
