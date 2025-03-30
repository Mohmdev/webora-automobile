'use client'

import { ClearFilters } from '@/components/filters/clear-filters'
import {
  BodyTypeFilter,
  ColourFilter,
  CurrencyFilter,
  DoorsFilter,
  FuelTypeFilter,
  OdometerFilter,
  OdometerUnitFilter,
  PriceFilter,
  SeatsFilter,
  TaxonomyFiltersBlock,
  TransmissionFilter,
  UlezComplianceFilter,
  YearFilter,
} from '@/components/filters/render-filters'
import { SearchInput } from '@/components/shared/search-input'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import type { MinMaxProps, ParamsAwaitedProps } from '@/types'
import { Settings2 } from 'lucide-react'
import { useState } from 'react'
import { CloseDialogButton } from './close-dialog-button'

export function FiltersDialog({
  minMaxValues,
  searchParams,
  count,
  className,
}: MinMaxProps & ParamsAwaitedProps & { count: number; className?: string }) {
  const [open, setIsOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className={cn('inline-flex', className)}
        >
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
            placeholder="Search vehicles..."
            className="w-full rounded-md border px-3 py-2 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
          />

          <div className="space-y-2">
            <TaxonomyFiltersBlock searchParams={searchParams} />

            <YearFilter
              minMaxValues={minMaxValues}
              searchParams={searchParams}
            />

            <PriceFilter
              minMaxValues={minMaxValues}
              searchParams={searchParams}
            />

            <OdometerFilter
              minMaxValues={minMaxValues}
              searchParams={searchParams}
            />

            <CurrencyFilter searchParams={searchParams} />

            <OdometerUnitFilter searchParams={searchParams} />

            <TransmissionFilter searchParams={searchParams} />

            <FuelTypeFilter searchParams={searchParams} />

            <BodyTypeFilter searchParams={searchParams} />

            <ColourFilter searchParams={searchParams} />

            <UlezComplianceFilter searchParams={searchParams} />

            <DoorsFilter searchParams={searchParams} />

            <SeatsFilter searchParams={searchParams} />
          </div>

          <div className="flex flex-col space-y-2">
            <CloseDialogButton count={count} onClose={() => setIsOpen(false)} />

            <ClearFilters
              label="Clear Filters"
              searchParams={searchParams}
              look="persistent"
              className="flex-1"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
