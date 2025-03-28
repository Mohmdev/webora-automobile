'use client'

import { RangeFilter } from '@/components/filters/range-filters'
import { TaxonomyFilters } from '@/components/filters/taxonomy-filters'
import { FormLabel } from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  formatBodyType,
  formatColour,
  formatFuelType,
  formatOdometerUnit,
  formatTransmission,
  formatUlezCompliance,
} from '@/lib/utils'
import type { SidebarProps } from '@/types'
import {
  BodyType,
  Colour,
  CurrencyCode,
  FuelType,
  OdoUnit,
  Transmission,
  ULEZCompliance,
} from '@prisma/client'
import type { ChangeEvent } from 'react'

export function SidebarFilterControls({
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
}) {
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
    <div className="space-y-2 p-4">
      <TaxonomyFilters
        searchParams={searchParams}
        handleChange={handleChange}
      />

      <RangeFilter
        label="Year"
        minName="minYear"
        maxName="maxYear"
        defaultMin={_min.year || 1925}
        defaultMax={_max.year || new Date().getFullYear()}
        handleChange={handleChange}
        searchParams={searchParams}
      />
      <RangeFilter
        label="Price"
        minName="minPrice"
        maxName="maxPrice"
        defaultMin={_min.price || 0}
        defaultMax={_max.price || 21474836}
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
        defaultMin={_min.odoReading || 0}
        defaultMax={_max.odoReading || 1000000}
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
