'use client'

import { fetchMinMaxValues } from '@/_data'
import { RangeFilter } from '@/components/filters/ui/range-filters'
import { useFilters } from '@/hooks/filters/use-filters'
import type { ResolvedParams } from '@/types'
import { useQuery } from '@tanstack/react-query'

export function OdometerFilter({ searchParams }: ResolvedParams) {
  const { data: minMaxValues } = useQuery({
    queryKey: ['minMaxValues'],
    queryFn: fetchMinMaxValues,
  })

  const { handleChange } = useFilters(searchParams as Record<string, string>)

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
