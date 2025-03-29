'use client'

import { SidebarFilterControls } from '@/components/filters/controls/filter-controls'
import { SearchInput } from '@/components/shared/search-input'
import { useSidebarFilters } from '@/hooks/filters/useSidebarFilters'
import type { MinMaxProps, SearchAwaitedProps } from '@/types'

export function PanelBody({
  minMaxValues,
  searchParams,
}: MinMaxProps & SearchAwaitedProps) {
  const { queryStates, handleChange, handleSelectChange } = useSidebarFilters(
    searchParams as Record<string, string>
  )

  return (
    <>
      <div className="p-4">
        <SearchInput
          placeholder="Search classifieds..."
          className="w-full rounded-md border px-3 py-2 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <SidebarFilterControls
        minMaxValues={minMaxValues}
        searchParams={searchParams}
        queryStates={queryStates}
        handleChange={handleChange}
        handleSelectChange={handleSelectChange}
      />
    </>
  )
}
