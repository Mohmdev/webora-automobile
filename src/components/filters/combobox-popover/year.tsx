'use client'

import { ComboboxPopoverFilter } from '@/components/filters/ui/combobox-popover-filter'
import type { ResolvedParams } from '@/types'
import { CarIcon } from 'lucide-react'

export function YearComboBoxPopover({ searchParams }: ResolvedParams) {
  const options = Array.from({ length: 100 }, (_, i) => ({
    optionValue: new Date().getFullYear() - i,
    optionLabel: (new Date().getFullYear() - i).toString(),
  }))

  return (
    <ComboboxPopoverFilter
      searchParams={searchParams}
      name="year"
      label="Year"
      placeholder="Choose a Year..."
      options={options.map((option) => ({
        optionValue: option.optionValue.toString(),
        optionLabel: option.optionLabel,
      }))}
      icon={CarIcon}
    />
  )
}
