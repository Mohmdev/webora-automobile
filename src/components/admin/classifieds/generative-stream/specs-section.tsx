import { Skeleton } from '@/components/ui/skeleton'
import {
  formatColour,
  formatFuelType,
  formatNumber,
  formatOdometerUnit,
  formatTransmission,
} from '@/lib/utils'
import type { Colour, FuelType, OdoUnit, Transmission } from '@prisma/client'
import type { ReactNode } from 'react'

export type SpecType = {
  value: string | undefined
  label: string | undefined
}

export function SpecsSection({
  specs,
  done,
}: {
  specs: SpecType[]
  done: boolean
}) {
  return (
    <div className="my-4 flex flex-wrap items-center gap-2">
      {specs.map((spec, idx) => {
        let content: ReactNode = null
        if (spec.value) {
          content = (
            <span
              key={idx}
              className="rounded-md bg-gray-200 px-2 py-0 font-medium text-gray-800 text-sm"
            >
              {spec.value} {spec.label || ''}
            </span>
          )
        } else if (!done) {
          content = <Skeleton key={idx} className="h-6 w-16 rounded-md" />
        }
        return content
      })}
    </div>
  )
}

// Utility function to prepare specs data to be passed down to SpecsSection
export function prepareSpecs({
  odoReading,
  odoUnit,
  fuelType,
  colour,
  transmission,
}: {
  odoReading?: number | null | undefined
  odoUnit?: OdoUnit | null | undefined
  fuelType?: FuelType | null | undefined
  colour?: Colour | null | undefined
  transmission?: Transmission | null | undefined
}): SpecType[] {
  return [
    {
      value:
        odoReading !== undefined &&
        odoReading !== null &&
        odoReading > 0 &&
        odoUnit
          ? `${formatNumber(odoReading)} ${formatOdometerUnit(odoUnit)}`
          : undefined,
      label: undefined,
    },
    {
      value: fuelType ? formatFuelType(fuelType) : undefined,
      label: undefined,
    },
    {
      value: colour ? formatColour(colour) : undefined,
      label: undefined,
    },
    {
      value: transmission ? formatTransmission(transmission) : undefined,
      label: undefined,
    },
  ]
}
