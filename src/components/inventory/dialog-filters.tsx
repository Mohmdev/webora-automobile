'use client'

import { routes } from '@/config/routes'
import type { SidebarProps } from '@/config/types'
import { env } from '@/env'
import {
  cn,
  formatBodyType,
  formatColour,
  formatFuelType,
  formatOdometerUnit,
  formatTransmission,
  formatUlezCompliance,
} from '@/lib/utils'
import {
  BodyType,
  Colour,
  CurrencyCode,
  FuelType,
  OdoUnit,
  Transmission,
  ULEZCompliance,
} from '@prisma/client'
import { Settings2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { parseAsString, useQueryStates } from 'nuqs'
import { type ChangeEvent, useEffect, useState } from 'react'
import { SearchInput } from '../shared/search-input'
import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '../ui/dialog'
import { FormLabel } from '../ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { RangeFilter } from './range-filters'
import { TaxonomyFilters } from './taxonomy-filters'

interface DialogFiltersProps extends SidebarProps {
  count: number
}

// Extract filter states to reduce component complexity
const useFilterStates = (searchParams: Record<string, string> | undefined) => {
  const [filterCount, setFilterCount] = useState(0)
  const router = useRouter()

  const [queryStates, setQueryStates] = useQueryStates(
    {
      make: parseAsString.withDefault(''),
      model: parseAsString.withDefault(''),
      modelVariant: parseAsString.withDefault(''),
      minYear: parseAsString.withDefault(''),
      maxYear: parseAsString.withDefault(''),
      minPrice: parseAsString.withDefault(''),
      maxPrice: parseAsString.withDefault(''),
      minReading: parseAsString.withDefault(''),
      maxReading: parseAsString.withDefault(''),
      currency: parseAsString.withDefault(''),
      odoUnit: parseAsString.withDefault(''),
      transmission: parseAsString.withDefault(''),
      fuelType: parseAsString.withDefault(''),
      bodyType: parseAsString.withDefault(''),
      colour: parseAsString.withDefault(''),
      doors: parseAsString.withDefault(''),
      seats: parseAsString.withDefault(''),
      ulezCompliance: parseAsString.withDefault(''),
    },
    {
      shallow: false,
    }
  )

  useEffect(() => {
    if (!searchParams) {
      return
    }

    const count = Object.entries(searchParams).filter(
      ([key, value]) => key !== 'page' && value
    ).length

    setFilterCount(count)
  }, [searchParams])

  const clearFilters = () => {
    const url = new URL(routes.inventory, env.NEXT_PUBLIC_APP_URL)
    router.replace(url.toString())
    setFilterCount(0)
  }

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target

    setQueryStates({
      [name]: value || null,
    })

    if (name === 'make') {
      setQueryStates({
        model: null,
        modelVariant: null,
      })
    }

    router.refresh()
  }

  const handleSelectChange = (name: string, value: string) => {
    setQueryStates({
      [name]: value || null,
    })

    if (name === 'make') {
      setQueryStates({
        model: null,
        modelVariant: null,
      })
    }

    router.refresh()
  }

  return {
    queryStates,
    filterCount,
    clearFilters,
    handleChange,
    handleSelectChange,
  }
}

// Component to render all filter controls
const FilterControls = ({
  minMaxValues,
  searchParams,
  queryStates,
  handleChange,
  handleSelectChange,
}: {
  minMaxValues: SidebarProps['minMaxValues']
  searchParams: SidebarProps['searchParams']
  queryStates: Record<string, string>
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
  handleSelectChange: (name: string, value: string) => void
}) => {
  const { _min, _max } = minMaxValues

  const renderSelect = (
    label: string,
    name: string,
    value: string,
    options: { label: string; value: string }[],
    disabled = false
  ) => (
    <div className="space-y-2">
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Select
        name={name}
        value={value || '_empty'}
        disabled={disabled}
        onValueChange={(value) =>
          handleSelectChange(name, value === '_empty' ? '' : value)
        }
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder={`Select ${label.toLowerCase()}`} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="_empty">Select</SelectItem>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )

  return (
    <div className="space-y-2">
      <TaxonomyFilters
        searchParams={searchParams}
        handleChange={handleChange}
      />

      <RangeFilter
        label="Year"
        minName="minYear"
        maxName="maxYear"
        defaultMin={_min?.year || 1925}
        defaultMax={_max?.year || new Date().getFullYear()}
        handleChange={handleChange}
        searchParams={searchParams}
      />
      <RangeFilter
        label="Price"
        minName="minPrice"
        maxName="maxPrice"
        defaultMin={_min?.price || 0}
        defaultMax={_max?.price || 21474836}
        handleChange={handleChange}
        searchParams={searchParams}
        increment={1000000}
        thousandSeparator
        currency={{
          currencyCode: 'GBP',
        }}
      />
      <RangeFilter
        label="Odometer Reading"
        minName="minReading"
        maxName="maxReading"
        defaultMin={_min?.odoReading || 0}
        defaultMax={_max?.odoReading || 1000000}
        handleChange={handleChange}
        searchParams={searchParams}
        increment={5000}
        thousandSeparator
      />

      {renderSelect(
        'Currency',
        'currency',
        queryStates.currency || '',
        Object.values(CurrencyCode).map((value) => ({
          label: value,
          value,
        }))
      )}

      {renderSelect(
        'Odometer Unit',
        'odoUnit',
        queryStates.odoUnit || '',
        Object.values(OdoUnit).map((value) => ({
          label: formatOdometerUnit(value),
          value,
        }))
      )}

      {renderSelect(
        'Transmission',
        'transmission',
        queryStates.transmission || '',
        Object.values(Transmission).map((value) => ({
          label: formatTransmission(value),
          value,
        }))
      )}

      {renderSelect(
        'Fuel Type',
        'fuelType',
        queryStates.fuelType || '',
        Object.values(FuelType).map((value) => ({
          label: formatFuelType(value),
          value,
        }))
      )}

      {renderSelect(
        'Body Type',
        'bodyType',
        queryStates.bodyType || '',
        Object.values(BodyType).map((value) => ({
          label: formatBodyType(value),
          value,
        }))
      )}

      {renderSelect(
        'Colour',
        'colour',
        queryStates.colour || '',
        Object.values(Colour).map((value) => ({
          label: formatColour(value),
          value,
        }))
      )}

      {renderSelect(
        'ULEZ Compliance',
        'ulezCompliance',
        queryStates.ulezCompliance || '',
        Object.values(ULEZCompliance).map((value) => ({
          label: formatUlezCompliance(value),
          value,
        }))
      )}

      {renderSelect(
        'Doors',
        'doors',
        queryStates.doors || '',
        Array.from({ length: 6 }).map((_, i) => ({
          label: Number(i + 1).toString(),
          value: Number(i + 1).toString(),
        }))
      )}

      {renderSelect(
        'Seats',
        'seats',
        queryStates.seats || '',
        Array.from({ length: 8 }).map((_, i) => ({
          label: Number(i + 1).toString(),
          value: Number(i + 1).toString(),
        }))
      )}
    </div>
  )
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
  } = useFilterStates(searchParams as Record<string, string>)

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

          <FilterControls
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
