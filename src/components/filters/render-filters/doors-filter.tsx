'use client'

import { SelectFilter } from '@/components/filters/ui/select-filter'
import { useFilters } from '@/hooks/filters/use-filters'
import type { ResolvedParams } from '@/types'

export function DoorsFilter({ searchParams }: ResolvedParams) {
  const { queryStates, handleSelectChange } = useFilters(
    searchParams as Record<string, string>
  )

  return (
    <SelectFilter
      label="Doors"
      name="doors"
      value={queryStates.doors || ''}
      options={Array.from({ length: 6 }).map((_, i) => ({
        label: Number(i + 1).toString(),
        value: Number(i + 1).toString(),
      }))}
      handleSelectChange={handleSelectChange}
    />
  )
}
