'use client'

import { ComboboxPopoverFilter } from '@/components/filters/ui/combobox-popover-filter'
import { formatTransmission } from '@/lib/utils'
import type { ResolvedParams } from '@/types'
import { Transmission } from '@prisma/client'
import { CarIcon } from 'lucide-react'

export function TransmissionComboBoxPopover({ searchParams }: ResolvedParams) {
  const options = Object.values(Transmission).map((value) => ({
    optionValue: value,
    optionLabel: formatTransmission(value),
  }))

  return (
    <ComboboxPopoverFilter
      searchParams={searchParams}
      name="transmission"
      label="Transmission"
      placeholder="Choose a Transmission Type..."
      options={options}
      icon={CarIcon}
    />
  )
}
