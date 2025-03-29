'use client'

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
import { formatFuelType, formatUlezCompliance } from '@/lib/utils'
import type { SearchAwaitedProps } from '@/types'
import { FuelType, ULEZCompliance } from '@prisma/client'
import { ChevronRight } from 'lucide-react'

export function Block5({ searchParams }: SearchAwaitedProps) {
  const { queryStates, handleSelectChange } = useSidebarFilters(
    searchParams as Record<string, string>
  )

  return (
    <SidebarGroup>
      <Collapsible defaultOpen={false} className="group/collapsible">
        <SidebarGroupLabel
          asChild
          className="group/label w-full text-sidebar-foreground text-sm hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
          <CollapsibleTrigger>
            Additional filters
            <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
          </CollapsibleTrigger>
        </SidebarGroupLabel>
        <CollapsibleContent>
          <SidebarGroupContent>
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
                label="ULEZ Compliance"
                name="ulezCompliance"
                value={queryStates.ulezCompliance || ''}
                options={Object.values(ULEZCompliance).map((value) => ({
                  label: formatUlezCompliance(value),
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
