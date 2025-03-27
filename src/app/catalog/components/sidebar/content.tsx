'use client'

import { SearchInput } from '@/components/shared/search-input'
import {
  SidebarContent as SidebarContentComponent,
  SidebarSeparator,
} from '@/components/ui/sidebar'
import type { SidebarProps } from '@/config/types'
import { cn } from '@/lib/utils'
import { SidebarFilterControls } from './filter-controls'
import { useSidebarFilters } from './useSidebarFilters'
export function SidebarContent({ minMaxValues, searchParams }: SidebarProps) {
  const {
    queryStates,
    filterCount,
    clearFilters,
    handleChange,
    handleSelectChange,
  } = useSidebarFilters(searchParams as Record<string, string>)

  return (
    <SidebarContentComponent>
      <div>
        <div className="flex justify-between px-4 font-semibold text-lg">
          <span>Filters</span>
          <button
            type="button"
            onClick={clearFilters}
            aria-disabled={!filterCount}
            className={cn(
              'py-1 text-gray-500 text-sm',
              filterCount
                ? 'cursor-pointer hover:underline'
                : 'disabled pointer-events-none cursor-default opacity-50'
            )}
          >
            Clear all {filterCount ? `(${filterCount})` : null}
          </button>
        </div>
        <div className="mt-2" />
      </div>
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

      <SidebarSeparator className="mx-0" />
      {/* <DatePicker />
      <Calendars calendars={data ?? []} /> */}
    </SidebarContentComponent>
  )
}
