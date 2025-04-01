'use client'

import { SelectFilter } from '@/components/filters/ui/select-filter'
import { useFilters } from '@/hooks/filters/use-filters'
import { formatTransmission } from '@/lib/utils'
import type { ParamsAwaitedProps } from '@/types'
import { Transmission } from '@prisma/client'

export function TransmissionFilter({ searchParams }: ParamsAwaitedProps) {
  const { queryStates, handleSelectChange } = useFilters(
    searchParams as Record<string, string>
  )
  return (
    <SelectFilter
      label="Transmission"
      name="transmission"
      value={queryStates.transmission || ''}
      options={Object.values(Transmission).map((value) => ({
        label: formatTransmission(value),
        value,
      }))}
      handleSelectChange={handleSelectChange}
    />
  )
}
