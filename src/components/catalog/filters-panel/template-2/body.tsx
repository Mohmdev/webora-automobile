'use client'

import { TaxonomySelectFiltersStack } from '@/components/filters/_stack'
import { BodyTypeComboBoxPopover } from '@/components/filters/combobox-popover'
import { SearchInput } from '@/components/filters/input'
import {
  PriceRangeSliderWithInput,
  YearRangeSelect,
} from '@/components/filters/range'
import {
  ColourSelect,
  CurrencySelect,
  DoorsSelect,
  FuelTypeSelect,
  OdometerUnitSelect,
  SeatsSelect,
  TransmissionSelect,
  UlezComplianceSelect,
} from '@/components/filters/select'
import { CollapsibleFiltersStack } from '@/components/filters/ui/collapsible-filters-stack'
import { SidebarContent, SidebarSeparator } from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'
import type { ResolvedParams } from '@/types'

export function PanelBody({
  searchParams,
  paddingOptions = 'sm',
  className,
}: ResolvedParams & {
  paddingOptions?: 'sm' | 'md' | 'lg'
  className?: string
}) {
  const uniformStyles =
    paddingOptions === 'sm'
      ? 'px-1'
      : // biome-ignore lint/nursery/noNestedTernary: <explanation>
        paddingOptions === 'md'
        ? 'px-2'
        : 'px-3'

  return (
    <SidebarContent className={cn('py-0', className)}>
      <CollapsibleFiltersStack className={uniformStyles} noCollapsible>
        <SearchInput
          placeholder="Search vehicles..."
          className="w-full rounded-md border px-3 py-2 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
        />
        <PriceRangeSliderWithInput searchParams={searchParams} />
      </CollapsibleFiltersStack>

      <CollapsibleFiltersStack className={uniformStyles} noCollapsible>
        <TaxonomySelectFiltersStack searchParams={searchParams} />
      </CollapsibleFiltersStack>

      <SidebarSeparator className="mx-0" />

      <CollapsibleFiltersStack
        triggerLabel="Appearance"
        // icon={SquareStackIcon}
        defaultOpen={true}
        className={uniformStyles}
      >
        <BodyTypeComboBoxPopover searchParams={searchParams} />
        <ColourSelect searchParams={searchParams} />
        <DoorsSelect searchParams={searchParams} />
        <SeatsSelect searchParams={searchParams} />
      </CollapsibleFiltersStack>

      <SidebarSeparator className="mx-0" />

      <CollapsibleFiltersStack
        triggerLabel="Vehicle details"
        // icon={SquareStackIcon}
        defaultOpen={false}
        className={uniformStyles}
      >
        <YearRangeSelect searchParams={searchParams} />
        <FuelTypeSelect searchParams={searchParams} />
        <TransmissionSelect searchParams={searchParams} />
      </CollapsibleFiltersStack>

      <SidebarSeparator className="mx-0" />

      <CollapsibleFiltersStack
        triggerLabel="Additional filters"
        // icon={SquareStackIcon}
        defaultOpen={false}
        className={uniformStyles}
      >
        <OdometerUnitSelect searchParams={searchParams} />
        <UlezComplianceSelect searchParams={searchParams} />
        <CurrencySelect searchParams={searchParams} />
      </CollapsibleFiltersStack>
    </SidebarContent>
  )
}
