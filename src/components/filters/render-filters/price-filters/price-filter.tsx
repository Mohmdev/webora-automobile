'use client'

import { fetchMinMaxValues } from '@/_data'
import { RangeFilter } from '@/components/filters/ui/range-filters'
import { useSidebarFilters } from '@/hooks/filters/use-sidebar-filters'
import type { ParamsAwaitedProps } from '@/types'
import { useQuery } from '@tanstack/react-query'

export function PriceFilter({ searchParams }: ParamsAwaitedProps) {
  const { handleChange } = useSidebarFilters(
    searchParams as Record<string, string>
  )

  const { data: minMaxValues } = useQuery({
    queryKey: ['minMaxValues'],
    queryFn: fetchMinMaxValues,
  })

  return (
    <RangeFilter
      label="Price"
      minName="minPrice"
      maxName="maxPrice"
      defaultMin={minMaxValues?._min.price || 0}
      defaultMax={minMaxValues?._max.price || 1000000}
      handleChange={handleChange}
      searchParams={searchParams}
      increment={20000000}
      thousandSeparator
      currency={{
        currencyCode: 'USD',
      }}
    />
  )
}
