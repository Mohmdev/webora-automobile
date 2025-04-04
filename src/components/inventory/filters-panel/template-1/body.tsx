import { TaxonomySelectFiltersStack } from '@/components/filters/_stack'
import { SearchInput } from '@/components/filters/input'
import {
  OdometerRangeSelect,
  PriceRangeSelect,
  YearRangeSelect,
} from '@/components/filters/range'
import {
  BodyTypeSelect,
  ColourSelect,
  CurrencySelect,
  DoorsSelect,
  FuelTypeSelect,
  OdometerUnitSelect,
  SeatsSelect,
  TransmissionSelect,
  UlezComplianceSelect,
} from '@/components/filters/select'
import { cn } from '@/lib/utils'
import type { ResolvedParams } from '@/types'

export function PanelBody({
  searchParams,
  className,
}: ResolvedParams & { className?: string }) {
  return (
    <div className={cn(className)}>
      <div className="p-4">
        <SearchInput
          placeholder="Search classifieds..."
          className="w-full rounded-md border px-3 py-2 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="space-y-2 p-4">
        <TaxonomySelectFiltersStack searchParams={searchParams} />

        <YearRangeSelect searchParams={searchParams} />

        <PriceRangeSelect searchParams={searchParams} />

        <OdometerRangeSelect searchParams={searchParams} />

        <CurrencySelect searchParams={searchParams} />

        <OdometerUnitSelect searchParams={searchParams} />

        <TransmissionSelect searchParams={searchParams} />

        <FuelTypeSelect searchParams={searchParams} />

        <BodyTypeSelect searchParams={searchParams} />

        <ColourSelect searchParams={searchParams} />

        <UlezComplianceSelect searchParams={searchParams} />

        <DoorsSelect searchParams={searchParams} />

        <SeatsSelect searchParams={searchParams} />
      </div>
    </div>
  )
}
