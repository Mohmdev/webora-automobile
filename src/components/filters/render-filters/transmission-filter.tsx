'use client'

import { SelectFilter } from '@/components/filters/ui/select-filter'
import { useSidebarFilters } from '@/hooks/filters/use-sidebar-filters'
import { formatTransmission } from '@/lib/utils'
import type { ParamsAwaitedProps } from '@/types'
import { Transmission } from '@prisma/client'

export function TransmissionFilter({ searchParams }: ParamsAwaitedProps) {
  const { queryStates, handleSelectChange } = useSidebarFilters(
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
