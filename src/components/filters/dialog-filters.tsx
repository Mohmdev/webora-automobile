'use client'
import { useFilterStates } from '@/hooks/filters/useFilterStates'
import { cn } from '@/lib/utils'
import type { MinMaxProps, SearchAwaitedProps } from '@/types'
import { Settings2 } from 'lucide-react'
import { useState } from 'react'
import { SearchInput } from '../shared/search-input'
import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '../ui/dialog'
import { SidebarFilterControls } from './controls/filter-controls'

type DialogFiltersProps = MinMaxProps &
  SearchAwaitedProps & {
    count: number
  }

export const DialogFilters = (props: DialogFiltersProps) => {
  const { minMaxValues, searchParams, count } = props
  const [open, setIsOpen] = useState(false)

  const {
    queryStates,
    filterCount,
    clearFilters,
    handleChange,
    handleSelectChange,
  } = useFilterStates(searchParams as Record<string, string> | undefined)

  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="lg:hidden">
          <Settings2 className="h-4 w-4" />{' '}
        </Button>
      </DialogTrigger>
      <DialogContent className="h-[90vh] max-w-[425px] overflow-y-auto rounded-xl bg-white">
        <div className="space-y-6">
          <div>
            <div className="flex justify-between font-semibold text-lg">
              <DialogTitle>Filters</DialogTitle>
            </div>
            <div className="mt-2" />
          </div>

          <SearchInput
            placeholder="Search classifieds..."
            className="w-full rounded-md border px-3 py-2 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
          />

          <SidebarFilterControls
            minMaxValues={minMaxValues}
            searchParams={searchParams}
            queryStates={queryStates}
            handleChange={handleChange}
            handleSelectChange={handleSelectChange}
          />

          <div className="flex flex-col space-y-2">
            <Button
              type="button"
              onClick={() => setIsOpen(false)}
              className="w-full"
            >
              Search{count > 0 ? ` (${count})` : null}
            </Button>

            {filterCount > 0 && (
              <Button
                type="button"
                variant="outline"
                onClick={clearFilters}
                aria-disabled={!filterCount}
                className={cn(
                  'py-1 text-sm',
                  filterCount
                    ? 'hover:underline'
                    : 'disabled pointer-events-none cursor-default opacity-50'
                )}
              >
                Clear all {filterCount ? `(${filterCount})` : null}
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
