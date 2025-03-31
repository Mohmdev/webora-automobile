import type { QueryReturnMetaProps } from '@/_data/catalog'
import {
  BodyTypeFilter,
  ColourFilter,
  CurrencyFilter,
  DoorsFilter,
  FuelTypeFilter,
  OdometerFilter,
  OdometerUnitFilter,
  PriceFilter,
  SeatsFilter,
  TaxonomyFiltersBlock,
  TransmissionFilter,
  UlezComplianceFilter,
  YearFilter,
} from '@/components/filters/render-filters'
import { SearchInput } from '@/components/shared/search-input'
import type { ParamsAwaitedProps } from '@/types'

export function PanelBody({
  minMaxValues,
  searchParams,
}: QueryReturnMetaProps & ParamsAwaitedProps) {
  return (
    <>
      <div className="p-4">
        <SearchInput
          placeholder="Search classifieds..."
          className="w-full rounded-md border px-3 py-2 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="space-y-2 p-4">
        <TaxonomyFiltersBlock searchParams={searchParams} />

        <YearFilter minMaxValues={minMaxValues} searchParams={searchParams} />

        <PriceFilter minMaxValues={minMaxValues} searchParams={searchParams} />

        <OdometerFilter
          minMaxValues={minMaxValues}
          searchParams={searchParams}
        />

        <CurrencyFilter searchParams={searchParams} />

        <OdometerUnitFilter searchParams={searchParams} />

        <TransmissionFilter searchParams={searchParams} />

        <FuelTypeFilter searchParams={searchParams} />

        <BodyTypeFilter searchParams={searchParams} />

        <ColourFilter searchParams={searchParams} />

        <UlezComplianceFilter searchParams={searchParams} />

        <DoorsFilter searchParams={searchParams} />

        <SeatsFilter searchParams={searchParams} />
      </div>
    </>
  )
}
