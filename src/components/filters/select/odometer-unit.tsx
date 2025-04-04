'use client'

import { SelectFilter } from '@/components/filters/ui/select-filter'
import { useFilters } from '@/hooks/filters/use-filters'
import { formatOdometerUnit } from '@/lib/utils'
import type { ResolvedParams } from '@/types'
import { OdoUnit } from '@prisma/client'

export function OdometerUnitSelect({ searchParams }: ResolvedParams) {
  const { queryStates, handleSelectChange } = useFilters(
    searchParams as Record<string, string>
  )

  return (
    <SelectFilter
      label="Odometer Unit"
      name="odoUnit"
      value={queryStates.odoUnit || ''}
      options={Object.values(OdoUnit).map((value) => ({
        label: formatOdometerUnit(value),
        value,
      }))}
      handleSelectChange={handleSelectChange}
    />
  )
}
