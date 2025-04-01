'use client'

import { SelectFilter } from '@/components/filters/ui/select-filter'
import { useFilters } from '@/hooks/filters/use-filters'
import { formatUlezCompliance } from '@/lib/utils'
import type { ParamsAwaitedProps } from '@/types'
import { ULEZCompliance } from '@prisma/client'

export function UlezComplianceFilter({ searchParams }: ParamsAwaitedProps) {
  const { queryStates, handleSelectChange } = useFilters(
    searchParams as Record<string, string>
  )

  return (
    <SelectFilter
      label="ULEZ Compliance"
      name="ulezCompliance"
      value={queryStates.ulezCompliance || ''}
      options={Object.values(ULEZCompliance).map((value) => ({
        label: formatUlezCompliance(value),
        value,
      }))}
      handleSelectChange={handleSelectChange}
    />
  )
}
