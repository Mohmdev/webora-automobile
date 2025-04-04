'use client'

import { SelectFilter } from '@/components/filters/ui/select-filter'
import { useFilters } from '@/hooks/filters/use-filters'
import type { ResolvedParams } from '@/types'

export function SeatsSelect({ searchParams }: ResolvedParams) {
  const { queryStates, handleSelectChange } = useFilters(
    searchParams as Record<string, string>
  )

  return (
    <SelectFilter
      label="Seats"
      name="seats"
      value={queryStates.seats || ''}
      options={Array.from({ length: 8 }).map((_, i) => ({
        label: Number(i + 1).toString(),
        value: Number(i + 1).toString(),
      }))}
      handleSelectChange={handleSelectChange}
    />
  )
}
