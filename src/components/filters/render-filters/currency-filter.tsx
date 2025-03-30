'use client'

import { SelectFilter } from '@/components/filters/ui/select-filter'
import { useSidebarFilters } from '@/hooks/filters/useSidebarFilters'
import type { ParamsAwaitedProps } from '@/types'
import { CurrencyCode } from '@prisma/client'

export function CurrencyFilter({ searchParams }: ParamsAwaitedProps) {
  const { queryStates, handleSelectChange } = useSidebarFilters(
    searchParams as Record<string, string>
  )

  return (
    <SelectFilter
      label="Currency"
      name="currency"
      value={queryStates.currency || ''}
      options={Object.values(CurrencyCode).map((value) => ({
        label: value,
        value,
      }))}
      handleSelectChange={handleSelectChange}
    />
  )
}
