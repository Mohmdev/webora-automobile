'use client'

// import { sampleData } from '@/app/catalog/data'
// import { Calendars } from '@/components/catalog/_sub/calendars'
// import { DatePicker } from '@/components/catalog/_sub/date-picker'
import { TaxonomyFilters } from '@/components/filters/taxonomy-filters'
import { SidebarContent, SidebarSeparator } from '@/components/ui/sidebar'
import { useSidebarFilters } from '@/hooks/filters/useSidebarFilters'
import type { MinMaxProps, SearchAwaitedProps } from '@/types'
import { Block1 } from './block-1'

export function PanelBody({
  minMaxValues,
  searchParams,
}: MinMaxProps & SearchAwaitedProps) {
  const { queryStates, handleChange, handleSelectChange } = useSidebarFilters(
    searchParams as Record<string, string>
  )

  return (
    <SidebarContent>
      <Block1 searchParams={searchParams} />

      {/* Filter controls */}
      <div className="space-y-2 p-4">
        <TaxonomyFilters
          searchParams={searchParams}
          handleChange={handleChange}
        />
      </div>
      {/*  */}

      <SidebarSeparator className="mx-0" />
      {/* <DatePicker />
      <Calendars calendars={sampleData.calendars ?? []} /> */}
    </SidebarContent>
  )
}
