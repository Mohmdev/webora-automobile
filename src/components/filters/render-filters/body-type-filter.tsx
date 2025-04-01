'use client'

import { SelectFilter } from '@/components/filters/ui/select-filter'
import { useSidebarFilters } from '@/hooks/filters/use-sidebar-filters'
import { formatBodyType } from '@/lib/utils'
import type { ParamsAwaitedProps } from '@/types'
import { BodyType } from '@prisma/client'

export function BodyTypeFilter({ searchParams }: ParamsAwaitedProps) {
  const { queryStates, handleSelectChange } = useSidebarFilters(
    searchParams as Record<string, string>
  )

  return (
    <SelectFilter
      label="Body Type"
      name="bodyType"
      value={queryStates.bodyType || ''}
      options={Object.values(BodyType).map((value) => ({
        label: formatBodyType(value),
        value,
      }))}
      handleSelectChange={handleSelectChange}
    />
  )
}
