'use client'

import { ComboboxPopoverFilter } from '@/components/filters/ui/combobox-popover-filter'
import { formatBodyType } from '@/lib/utils'
import type { ResolvedParams } from '@/types'
import { BodyType } from '@prisma/client'
import { CarIcon } from 'lucide-react'

export function BodyTypeComboBoxPopover({ searchParams }: ResolvedParams) {
  const options = Object.values(BodyType).map((value) => ({
    optionValue: value,
    optionLabel: formatBodyType(value),
  }))

  return (
    <ComboboxPopoverFilter
      searchParams={searchParams}
      name="bodyType"
      label="Body Type"
      placeholder="Choose a Body Type..."
      options={options}
      icon={CarIcon}
    />
  )
}
