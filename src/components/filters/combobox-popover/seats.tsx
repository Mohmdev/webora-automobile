'use client'

import { ComboboxPopoverFilter } from '@/components/filters/ui/combobox-popover-filter'
import type { ResolvedParams } from '@/types'
import { CarIcon } from 'lucide-react'

export function SeatsComboBoxPopover({ searchParams }: ResolvedParams) {
  const options = Array.from({ length: 8 }).map((_, i) => ({
    optionValue: Number(i + 1).toString(),
    optionLabel: Number(i + 1).toString(),
  }))

  return (
    <ComboboxPopoverFilter
      searchParams={searchParams}
      name="seats"
      label="Seats"
      placeholder="Choose the number of Seats..."
      options={options}
      icon={CarIcon}
    />
  )
}
