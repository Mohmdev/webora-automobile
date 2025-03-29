import { parseAsString, useQueryStates } from 'nuqs'
import type React from 'react'

export function useHomepageFilters() {
  const [, setState] = useQueryStates(
    {
      make: parseAsString.withDefault(''),
      model: parseAsString.withDefault(''),
      modelVariant: parseAsString.withDefault(''),
      minYear: parseAsString.withDefault(''),
      maxYear: parseAsString.withDefault(''),
      minPrice: parseAsString.withDefault(''),
      maxPrice: parseAsString.withDefault(''),
    },
    { shallow: false }
  )

  const handleChange = async (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target

    switch (name) {
      case 'make':
        await setState({ make: value, model: null, modelVariant: null })
        break
      case 'model':
        await setState({ model: value, modelVariant: null })
        break
      default:
        await setState({ [name]: value })
    }
  }

  return { handleChange }
}
