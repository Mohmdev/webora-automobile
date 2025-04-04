'use client'

import { ComboboxPopoverFilter } from '@/components/filters/ui/combobox-popover-filter'
import { formatOdometerUnit } from '@/lib/utils'
import type { ResolvedParams } from '@/types'
import { OdoUnit } from '@prisma/client'
import { CarIcon } from 'lucide-react'

export function OdometerUnitComboBoxPopover({ searchParams }: ResolvedParams) {
  const options = Object.values(OdoUnit).map((value) => ({
    optionValue: value,
    optionLabel: formatOdometerUnit(value),
  }))

  return (
    <ComboboxPopoverFilter
      searchParams={searchParams}
      name="odoUnit"
      label="Odometer Unit"
      placeholder="Choose a Odometer Unit..."
      options={options}
      icon={CarIcon}
    />
  )
}
