'use client'

import { SelectFilter } from '@/components/filters/ui/select-filter'
import { useSidebarFilters } from '@/hooks/filters/use-sidebar-filters'
import type { ParamsAwaitedProps } from '@/types'

export function DoorsFilter({ searchParams }: ParamsAwaitedProps) {
  const { queryStates, handleSelectChange } = useSidebarFilters(
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
