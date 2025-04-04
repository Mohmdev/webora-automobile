'use client'

import { TaxonomySelectFiltersStack } from '@/components/filters/_stack'
import { ClearFilters } from '@/components/filters/clear-filters'
import { SearchInput } from '@/components/filters/input'
import {
  OdometerRangeSelect,
  PriceRangeSelect,
  YearRangeSelect,
} from '@/components/filters/range'
import {
  BodyTypeSelect,
  ColourSelect,
  CurrencySelect,
  DoorsSelect,
  FuelTypeSelect,
  OdometerUnitSelect,
  SeatsSelect,
  TransmissionSelect,
  UlezComplianceSelect,
} from '@/components/filters/select'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import type { ResolvedParams } from '@/types'
import { Settings2 } from 'lucide-react'
import { useState } from 'react'
import { CloseDialogButton } from './close-dialog-button'

export function FiltersDialog({
  searchParams,
  className,
}: ResolvedParams & { className?: string }) {
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
            <TaxonomySelectFiltersStack searchParams={searchParams} />

            <YearRangeSelect searchParams={searchParams} />

            <PriceRangeSelect searchParams={searchParams} />

            <OdometerRangeSelect searchParams={searchParams} />

            <CurrencySelect searchParams={searchParams} />

            <OdometerUnitSelect searchParams={searchParams} />

            <TransmissionSelect searchParams={searchParams} />

            <FuelTypeSelect searchParams={searchParams} />

            <BodyTypeSelect searchParams={searchParams} />

            <ColourSelect searchParams={searchParams} />

            <UlezComplianceSelect searchParams={searchParams} />

            <DoorsSelect searchParams={searchParams} />

            <SeatsSelect searchParams={searchParams} />
          </div>

          <div className="flex flex-col space-y-2">
            <CloseDialogButton
              searchParams={searchParams}
              onClose={() => setIsOpen(false)}
            />

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
