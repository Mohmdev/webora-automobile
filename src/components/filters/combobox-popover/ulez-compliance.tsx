'use client'

import { ComboboxPopoverFilter } from '@/components/filters/ui/combobox-popover-filter'
import { formatUlezCompliance } from '@/lib/utils'
import type { ResolvedParams } from '@/types'
import { ULEZCompliance } from '@prisma/client'
import { CarIcon } from 'lucide-react'

export function UlezComplianceComboBoxPopover({
  searchParams,
}: ResolvedParams) {
  const options = Object.values(ULEZCompliance).map((value) => ({
    optionValue: value,
    optionLabel: formatUlezCompliance(value),
  }))

  return (
    <ComboboxPopoverFilter
      searchParams={searchParams}
      name="ulezCompliance"
      label="ULEZ Compliance"
      placeholder="Choose a ULEZ Compliance..."
      options={options}
      icon={CarIcon}
    />
  )
}
