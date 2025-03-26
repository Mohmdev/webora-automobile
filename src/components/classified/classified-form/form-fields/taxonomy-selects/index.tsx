'use client'

import { endpoints } from '@/config/endpoints'
import type { FilterOptions } from '@/config/types'
import { api } from '@/lib/api-client'
import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { FormTaxonomySelect } from './form-taxonomy-select'

export const TaxonomySelects = () => {
  const form = useFormContext()

  // Check if the form context is available
  if (!form) {
    throw new Error(
      'TaxonomySelects must be used within a FormProvider component'
    )
  }

  const defaultMake = form.getValues('make') || null
  const defaultModel = form.getValues('model') || null

  const [make, setMake] = useState<string | null>(defaultMake)
  const [makes, setMakes] = useState<FilterOptions<string, string>>([])

  const [model, setModel] = useState<string | null>(defaultModel)
  const [models, setModels] = useState<FilterOptions<string, string>>([])

  const [modelVariants, setModelVariants] = useState<
    FilterOptions<string, string>
  >([])

  useEffect(() => {
    ;(async function fetchMakeOptions() {
      const url = new URL(endpoints.taxonomy, window.location.href)
      if (make) {
        url.searchParams.append('make', make)
      }
      if (model) {
        url.searchParams.append('model', model)
      }

      const data = await api.get<{
        makes: FilterOptions<string, string>
        models: FilterOptions<string, string>
        modelVariants: FilterOptions<string, string>
      }>(url.toString())

      setMakes(data.makes)
      setModels(data.models)
      setModelVariants(data.modelVariants)
    })()
  }, [make, model])

  const handleChange = (name: string, value: string) => {
    const processedValue = value === '_empty' ? '' : value

    switch (name) {
      case 'make':
        setMake(processedValue)
        break
      case 'model':
        setModel(processedValue)
        break
      default:
        break
    }

    return processedValue
  }

  return (
    <>
      <FormTaxonomySelect
        name="make"
        label="Make"
        options={makes}
        onValueChange={(value) => handleChange('make', value)}
        placeholder="Select make"
      />
      <FormTaxonomySelect
        name="model"
        label="Model"
        options={models}
        disabled={!models.length}
        onValueChange={(value) => handleChange('model', value)}
        placeholder="Select model"
      />
      <FormTaxonomySelect
        name="modelVariant"
        label="Model Variant"
        options={modelVariants}
        disabled={!modelVariants.length}
        placeholder="Select model variant"
      />
    </>
  )
}
