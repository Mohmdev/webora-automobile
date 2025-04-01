'use client'

import { fetchMinMaxValues } from '@/_data'
import { RangeFilter } from '@/components/filters/ui/range-filters'
import { useSidebarFilters } from '@/hooks/filters/use-sidebar-filters'
import type { ParamsAwaitedProps } from '@/types'
import { useQuery } from '@tanstack/react-query'

export function OdometerFilter({ searchParams }: ParamsAwaitedProps) {
  const { data: minMaxValues } = useQuery({
    queryKey: ['minMaxValues'],
    queryFn: fetchMinMaxValues,
  })

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
