'use client'

import { ComboboxPopoverFilter } from '@/components/filters/ui/combobox-popover-filter'
import { formatColour } from '@/lib/utils'
import type { ResolvedParams } from '@/types'
import { Colour } from '@prisma/client'
import { CarIcon } from 'lucide-react'

export function ColorComboBoxPopover({ searchParams }: ResolvedParams) {
  const options = Object.values(Colour).map((value) => ({
    optionValue: value,
    optionLabel: formatColour(value),
  }))

  return (
    <ComboboxPopoverFilter
      searchParams={searchParams}
      name="colour"
      label="Colour"
      placeholder="Choose a Colour..."
      options={options}
      icon={CarIcon}
    />
  )
}
