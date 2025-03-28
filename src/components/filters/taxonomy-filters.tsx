'use client'

import { FormLabel } from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { endpoints } from '@/config/endpoints'
import { api } from '@/lib/api-client'
import type { FilterOptions, TaxonomyFiltersProps } from '@/types'
import type React from 'react'
import { useEffect, useState } from 'react'

export const TaxonomyFilters = (props: TaxonomyFiltersProps) => {
  const { searchParams, handleChange } = props

  const [makes, setMakes] = useState<FilterOptions<string, string>>([])
  const [models, setModels] = useState<FilterOptions<string, string>>([])
  const [modelVariants, setModelVariants] = useState<
    FilterOptions<string, string>
  >([])

  useEffect(() => {
    ;(async function fetchMakesOptions() {
      if (!searchParams) {
        return
      }

      const params = new URLSearchParams()
      for (const [k, v] of Object.entries(
        searchParams as Record<string, string>
      )) {
        if (v) {
          params.set(k, v as string)
        }
      }

      const url = new URL(endpoints.taxonomy, window.location.href)

      url.search = params.toString()

      try {
        const data = await api.get<{
          makes: FilterOptions<string, string>
          models: FilterOptions<string, string>
          modelVariants: FilterOptions<string, string>
        }>(url.toString())

        setMakes(data.makes)
        setModels(data.models)
        setModelVariants(data.modelVariants)
      } catch (error) {
        console.error('Error fetching taxonomy data:', error)
      }
    })()
  }, [searchParams])

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
          disabled={!models.length}
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
          disabled={!modelVariants.length}
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
