'use client'

import { SelectFilter } from '@/components/filters/ui/select-filter'
import { useSidebarFilters } from '@/hooks/filters/use-sidebar-filters'
import type { ParamsAwaitedProps } from '@/types'

export function SeatsFilter({ searchParams }: ParamsAwaitedProps) {
  const { queryStates, handleSelectChange } = useSidebarFilters(
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
