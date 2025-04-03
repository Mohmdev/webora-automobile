'use client'

import { SelectFilter } from '@/components/filters/ui/select-filter'
import { useFilters } from '@/hooks/filters/use-filters'
import { formatBodyType } from '@/lib/utils'
import type { ResolvedParams } from '@/types'
import { BodyType } from '@prisma/client'

export function BodyTypeFilter({ searchParams }: ResolvedParams) {
  const { queryStates, handleSelectChange } = useFilters(
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
