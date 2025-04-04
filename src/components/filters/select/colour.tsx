'use client'

import { SelectFilter } from '@/components/filters/ui/select-filter'
import { useFilters } from '@/hooks/filters/use-filters'
import { formatColour } from '@/lib/utils'
import type { ResolvedParams } from '@/types'
import { Colour } from '@prisma/client'

export function ColourSelect({ searchParams }: ResolvedParams) {
  const { queryStates, handleSelectChange } = useFilters(
    searchParams as Record<string, string>
  )

  return (
    <SelectFilter
      label="Colour"
      name="colour"
      value={queryStates.colour || ''}
      options={Object.values(Colour).map((value) => ({
        label: formatColour(value),
        value,
      }))}
      handleSelectChange={handleSelectChange}
    />
  )
}
