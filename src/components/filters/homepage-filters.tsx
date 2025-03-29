'use client'

import { useHomepageFilters } from '@/hooks/filters/useHomepageFilters'
import type { MinMaxProps, SearchAwaitedProps } from '@/types'
import { RangeFilter } from './range-filters'
import { TaxonomyFilters } from './taxonomy-filters'

type HomepageTaxonomyFiltersProps = MinMaxProps & SearchAwaitedProps

export const HomepageTaxonomyFilters = ({
  searchParams,
  minMaxValues,
}: HomepageTaxonomyFiltersProps) => {
  const { _min, _max } = minMaxValues
  const { handleChange } = useHomepageFilters()

  return (
    <>
      <TaxonomyFilters
        handleChange={handleChange}
        searchParams={searchParams}
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
    </>
  )
}
