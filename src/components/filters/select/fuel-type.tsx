'use client'

import { SelectFilter } from '@/components/filters/ui/select-filter'
import { useFilters } from '@/hooks/filters/use-filters'
import { formatFuelType } from '@/lib/utils'
import type { ResolvedParams } from '@/types'
import { FuelType } from '@prisma/client'

export function FuelTypeSelect({ searchParams }: ResolvedParams) {
  const { queryStates, handleSelectChange } = useFilters(
    searchParams as Record<string, string>
  )
  return (
    <SelectFilter
      label="Fuel Type"
      name="fuelType"
      value={queryStates.fuelType || ''}
      options={Object.values(FuelType).map((value) => ({
        label: formatFuelType(value),
        value,
      }))}
      handleSelectChange={handleSelectChange}
    />
  )
}
