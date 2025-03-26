'use client'

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Skeleton } from '@/components/ui/skeleton'
import {
  formatBodyType,
  formatColour,
  formatFuelType,
  formatTransmission,
  formatUlezCompliance,
  generateYears,
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
import dynamic from 'next/dynamic'
import { useFormContext } from 'react-hook-form'
import { FormInput } from './form-input'
import { FormNumberInput } from './form-number-input'
import { FormSelect } from './form-select'
import { InputSelect } from './input-select'
import { TaxonomySelects } from './taxonomy-selects'

const RichTextEditor = dynamic(
  () => import('../../rich-text-editor').then((mod) => mod.RichTextEditor),
  {
    ssr: false,
    loading: () => (
      <div className="flex flex-col space-y-2">
        <Skeleton className="h-4 w-24 bg-primary-800" />
        <Skeleton className="h-[200px] w-full bg-primary-800" />
      </div>
    ),
  }
)

const years = generateYears(1925)

export const ClassifiedFormFields = () => {
  const form = useFormContext()

  return (
    <div className="grid grid-cols-1 gap-4 text-muted md:grid-cols-2">
      <FormSelect
        name="year"
        label="Year"
        options={years.map((year) => ({
          label: year,
          value: year,
        }))}
      />
      <TaxonomySelects />
      <InputSelect
        options={Object.values(CurrencyCode).map((value) => ({
          label: value,
          value,
        }))}
        label="Price"
        inputName="price"
        selectName="currency"
        inputMode="numeric"
        placeholder="0"
        className="h-10"
      />

      <InputSelect
        options={Object.values(OdoUnit).map((value) => ({
          label: value,
          value,
        }))}
        label="Odometer Reading"
        inputName="odoReading"
        selectName="odoUnit"
        inputMode="numeric"
        placeholder="0"
        className="h-10"
      />

      <FormSelect
        name="transmission"
        label="Transmission"
        options={Object.values(Transmission).map((value) => ({
          label: formatTransmission(value),
          value,
        }))}
      />

      <FormSelect
        name="fuelType"
        label="Fuel Type"
        options={Object.values(FuelType).map((value) => ({
          label: formatFuelType(value),
          value,
        }))}
      />

      <FormSelect
        name="bodyType"
        label="Body Type"
        options={Object.values(BodyType).map((value) => ({
          label: formatBodyType(value),
          value,
        }))}
      />

      <FormSelect
        name="colour"
        label="Colour"
        options={Object.values(Colour).map((value) => ({
          label: formatColour(value),
          value,
        }))}
      />

      <FormSelect
        name="ulezCompliance"
        label="ULEZ Compliance"
        options={Object.values(ULEZCompliance).map((value) => ({
          label: formatUlezCompliance(value),
          value,
        }))}
      />

      <FormInput
        name="vrm"
        label="Vehicle Registration Mark"
        placeholder="LA16 PYW"
        className="uppercase"
      />
      <FormNumberInput name="doors" label="Doors" min={1} max={6} />
      <FormNumberInput name="seats" label="Seats" min={1} max={8} />

      <div className="col-span-2">
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <RichTextEditor
                  label="Description"
                  config={{
                    init: { placeholder: "Enter your vehicle's description" },
                  }}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  )
}
