import { RangeFilter } from '@/components/filters/range-filters'
import { SelectFilter } from '@/components/filters/select-filter'
import { TaxonomyFilters } from '@/components/filters/taxonomy-filters'
import {
  formatBodyType,
  formatColour,
  formatFuelType,
  formatOdometerUnit,
  formatTransmission,
  formatUlezCompliance,
} from '@/lib/utils'
import type { MinMaxProps, SearchAwaitedProps } from '@/types'
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
  minMaxValues: MinMaxProps['minMaxValues']
  searchParams: SearchAwaitedProps['searchParams']
  queryStates: Record<string, string>
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
  handleSelectChange: (name: string, value: string) => void
}) {
  const { _min, _max } = minMaxValues

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

      <SelectFilter
        label="Currency"
        name="currency"
        value={queryStates.currency || ''}
        options={Object.values(CurrencyCode).map((value) => ({
          label: value,
          value,
        }))}
        handleSelectChange={handleSelectChange}
      />

      <SelectFilter
        label="Odometer Unit"
        name="odoUnit"
        value={queryStates.odoUnit || ''}
        options={Object.values(OdoUnit).map((value) => ({
          label: formatOdometerUnit(value),
          value,
        }))}
        handleSelectChange={handleSelectChange}
      />

      <SelectFilter
        label="Transmission"
        name="transmission"
        value={queryStates.transmission || ''}
        options={Object.values(Transmission).map((value) => ({
          label: formatTransmission(value),
          value,
        }))}
        handleSelectChange={handleSelectChange}
      />

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
  )
}
