'use client'

import { ComboboxPopoverFilter } from '@/components/filters/ui/combobox-popover-filter'
import type { ResolvedParams } from '@/types'
import { CarIcon } from 'lucide-react'

export function OdometerComboBoxPopover({ searchParams }: ResolvedParams) {
  const options = Array.from({ length: 1000000 }, (_, i) => ({
    optionValue: i * 5000,
    optionLabel: `${i * 5000} miles`,
  }))

  return (
    <ComboboxPopoverFilter
      searchParams={searchParams}
      name="odoReading"
      label="Odometer Reading"
      placeholder="Choose a Odometer Reading..."
      options={options.map((option) => ({
        optionValue: option.optionValue.toString(),
        optionLabel: option.optionLabel,
      }))}
      icon={CarIcon}
    />
  )
}
