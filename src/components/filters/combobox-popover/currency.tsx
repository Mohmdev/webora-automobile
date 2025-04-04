'use client'

import { ComboboxPopoverFilter } from '@/components/filters/ui/combobox-popover-filter'
import type { ResolvedParams } from '@/types'
import { CurrencyCode } from '@prisma/client'
import { CarIcon } from 'lucide-react'

export function CurrencyComboBoxPopover({ searchParams }: ResolvedParams) {
  const options = Object.values(CurrencyCode).map((value) => ({
    optionValue: value,
    optionLabel: value,
  }))

  return (
    <ComboboxPopoverFilter
      searchParams={searchParams}
      name="currency"
      label="Currency"
      placeholder="Choose a Currency..."
      options={options}
      icon={CarIcon}
    />
  )
}
