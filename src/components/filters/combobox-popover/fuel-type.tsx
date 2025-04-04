'use client'

import { ComboboxPopoverFilter } from '@/components/filters/ui/combobox-popover-filter'
import { formatFuelType } from '@/lib/utils'
import type { ResolvedParams } from '@/types'
import { FuelType } from '@prisma/client'
import { CarIcon } from 'lucide-react'

export function FuelTypeComboBoxPopover({ searchParams }: ResolvedParams) {
  const options = Object.values(FuelType).map((value) => ({
    optionValue: value,
    optionLabel: formatFuelType(value),
  }))

  return (
    <ComboboxPopoverFilter
      searchParams={searchParams}
      name="fuelType"
      label="Fuel Type"
      placeholder="Choose a Fuel Type..."
      options={options}
      icon={CarIcon}
    />
  )
}
