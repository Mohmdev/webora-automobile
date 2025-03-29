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
import { formatBodyType, formatColour } from '@/lib/utils'
import type { SearchAwaitedProps } from '@/types'
import { BodyType, Colour } from '@prisma/client'
import { ChevronRight } from 'lucide-react'

export function Block3({ searchParams }: SearchAwaitedProps) {
  const { queryStates, handleSelectChange } = useSidebarFilters(
    searchParams as Record<string, string>
  )

  return (
    <SidebarGroup>
      <Collapsible defaultOpen={true} className="group/collapsible">
        <SidebarGroupLabel
          asChild
          className="group/label w-full text-sidebar-foreground text-sm hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
          <CollapsibleTrigger>
            Appearance
            <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
          </CollapsibleTrigger>
        </SidebarGroupLabel>
        <CollapsibleContent>
          <SidebarGroupContent>
            {/*  */}
            <div className="flex flex-row flex-nowrap items-center justify-between gap-2">
              <SelectFilter
                label="Body Type"
                name="bodyType"
                value={queryStates.bodyType || ''}
                options={Object.values(BodyType).map((value) => ({
                  label: formatBodyType(value),
                  value,
                }))}
                handleSelectChange={handleSelectChange}
              />

              <SelectFilter
                label="Colour"
                name="colour"
                value={queryStates.colour || ''}
                options={Object.values(Colour).map((value) => ({
                  label: formatColour(value),
                  value,
                }))}
                handleSelectChange={handleSelectChange}
              />
            </div>
            {/*  */}
            <div className="flex flex-row flex-nowrap items-center justify-between gap-2">
              <SelectFilter
                label="Doors"
                name="doors"
                value={queryStates.doors || ''}
                options={Array.from({ length: 6 }).map((_, i) => ({
                  label: Number(i + 1).toString(),
                  value: Number(i + 1).toString(),
                }))}
                handleSelectChange={handleSelectChange}
              />

              <SelectFilter
                label="Seats"
                name="seats"
                value={queryStates.seats || ''}
                options={Array.from({ length: 8 }).map((_, i) => ({
                  label: Number(i + 1).toString(),
                  value: Number(i + 1).toString(),
                }))}
                handleSelectChange={handleSelectChange}
              />
            </div>
          </SidebarGroupContent>
        </CollapsibleContent>
      </Collapsible>
    </SidebarGroup>
  )
}
