'use client'

import { FormLabel } from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useTaxonomyOptions } from '@/hooks/filters/useTaxonomyOptions'
import type { TaxonomyFiltersProps } from '@/types'
import type React from 'react'

export const TaxonomyFilters = (props: TaxonomyFiltersProps) => {
  const { searchParams, handleChange } = props
  const { makes, models, modelVariants, isLoading } = useTaxonomyOptions(
    searchParams as Record<string, string> | undefined
  )

  return (
    <>
      <div className="space-y-2">
        <FormLabel htmlFor="make">Make</FormLabel>
        <Select
          name="make"
          value={(searchParams?.make as string) || '_empty'}
          onValueChange={(value) =>
            handleChange({
              target: { name: 'make', value: value === '_empty' ? '' : value },
            } as React.ChangeEvent<HTMLSelectElement>)
          }
          disabled={isLoading}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select make" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="_empty">Select</SelectItem>
            {makes.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <FormLabel htmlFor="model">Model</FormLabel>
        <Select
          name="model"
          value={(searchParams?.model as string) || '_empty'}
          onValueChange={(value) =>
            handleChange({
              target: { name: 'model', value: value === '_empty' ? '' : value },
            } as React.ChangeEvent<HTMLSelectElement>)
          }
          disabled={!models.length || isLoading}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select model" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="_empty">Select</SelectItem>
            {models.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <FormLabel htmlFor="modelVariant">Model Variant</FormLabel>
        <Select
          name="modelVariant"
          value={(searchParams?.modelVariant as string) || '_empty'}
          onValueChange={(value) =>
            handleChange({
              target: {
                name: 'modelVariant',
                value: value === '_empty' ? '' : value,
              },
            } as React.ChangeEvent<HTMLSelectElement>)
          }
          disabled={!modelVariants.length || isLoading}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select model variant" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="_empty">Select</SelectItem>
            {modelVariants.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </>
  )
}
