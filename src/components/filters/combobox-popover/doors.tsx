'use client'

import { ComboboxPopoverFilter } from '@/components/filters/ui/combobox-popover-filter'
import type { ResolvedParams } from '@/types'
import { CarIcon } from 'lucide-react'

export function DoorsComboBoxPopover({ searchParams }: ResolvedParams) {
  const options = Array.from({ length: 6 }).map((_, i) => ({
    optionValue: Number(i + 1).toString(),
    optionLabel: Number(i + 1).toString(),
  }))

  return (
    <ComboboxPopoverFilter
      searchParams={searchParams}
      name="doors"
      label="Doors"
      placeholder="Choose a Doors..."
      options={options}
      icon={CarIcon}
    />
  )
}
