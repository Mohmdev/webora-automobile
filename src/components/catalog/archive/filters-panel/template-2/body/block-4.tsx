'use client'

import { RangeFilter } from '@/components/filters/range-filters'
import { SelectFilter } from '@/components/filters/select-filter'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from '@/components/ui/sidebar'
import { useSidebarFilters } from '@/hooks/filters/useSidebarFilters'
import { formatFuelType, formatTransmission } from '@/lib/utils'
import type { MinMaxProps, SearchAwaitedProps } from '@/types'
import { FuelType, Transmission } from '@prisma/client'
import { ChevronRight } from 'lucide-react'

export function Block4({
  searchParams,
  minMaxValues,
}: SearchAwaitedProps & MinMaxProps) {
  const { queryStates, handleSelectChange, handleChange } = useSidebarFilters(
    searchParams as Record<string, string>
  )
  const { _min, _max } = minMaxValues

  return (
    <SidebarGroup>
      <Collapsible defaultOpen={true} className="group/collapsible">
        <SidebarGroupLabel
          asChild
          className="group/label w-full text-sidebar-foreground text-sm hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
          <CollapsibleTrigger>
            Vehicle details
            <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
          </CollapsibleTrigger>
        </SidebarGroupLabel>
        <CollapsibleContent>
          <SidebarGroupContent>
            <RangeFilter
              label="Year"
              minName="minYear"
              maxName="maxYear"
              defaultMin={_min.year || 1925}
              defaultMax={_max.year || new Date().getFullYear()}
              handleChange={handleChange}
              searchParams={searchParams}
            />
            {/*  */}
            <div className="flex flex-row flex-nowrap items-center justify-between gap-2">
              <SelectFilter
                label="Fuel Type"
                name="fuelType"
                value={queryStates.fuelType || ''}
                options={Object.values(FuelType).map((value) => ({
                  label: formatFuelType(value),
                  value,
                }))}
                handleSelectChange={handleSelectChange}
              />
              <SelectFilter
                label="Transmission"
                name="transmission"
                value={queryStates.transmission || ''}
                options={Object.values(Transmission).map((value) => ({
                  label: formatTransmission(value),
                  value,
                }))}
                handleSelectChange={handleSelectChange}
              />
            </div>
            {/*  */}
            <div className="flex flex-row flex-nowrap items-center justify-between gap-2">
              {/*  */}
            </div>
          </SidebarGroupContent>
        </CollapsibleContent>
      </Collapsible>
    </SidebarGroup>
  )
}
