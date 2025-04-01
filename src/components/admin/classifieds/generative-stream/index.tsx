import { Skeleton } from '@/components/ui/skeleton'
import {
  formatBodyType,
  formatFuelType,
  formatNumber,
  formatOdometerUnit,
  formatTransmission,
} from '@/lib/utils'
import type { ClassifiedAI } from '@/schemas/classified-ai.schema'
import type { BodyType, FuelType, Make, Transmission } from '@prisma/client'
import {
  CarFrontIcon,
  CarIcon,
  Fingerprint,
  FuelIcon,
  GaugeIcon,
  PowerIcon,
  UsersIcon,
} from 'lucide-react'
import Image from 'next/image'
import { HeaderSection } from './header-section'
import { InfoCard } from './info-card'
import { SpecsSection, prepareSpecs } from './specs-section'
import { UlezCard } from './ulez-card'

export type GenerativeStreamProps = Partial<Omit<ClassifiedAI, 'make'>> & {
  make?: Make | null
  done?: boolean
}

// Type-safe wrapper functions
const safeFormatBodyType = (val: unknown): string => {
  return typeof val === 'string' ? formatBodyType(val as BodyType) : ''
}

const safeFormatFuelType = (val: unknown): string => {
  return typeof val === 'string' ? formatFuelType(val as FuelType) : ''
}

const safeFormatTransmission = (val: unknown): string => {
  return typeof val === 'string' ? formatTransmission(val as Transmission) : ''
}

// Main component with reduced complexity
export function GenerativeStream(props: GenerativeStreamProps) {
  const {
    image,
    title,
    odoReading,
    fuelType,
    transmission,
    description,
    bodyType,
    seats,
    ulezCompliance,
    doors,
    colour,
    vrm,
    odoUnit,
    make,
    done = false,
  } = props

  // Prepare specs using the extracted function
  const specs = prepareSpecs({
    odoReading,
    odoUnit,
    fuelType,
    colour,
    transmission,
  })

  return (
    <div className="container mx-auto flex flex-col py-12">
      <div className="flex flex-col md:flex-row">
        <div className="relative md:w-1/2">
          {image ? (
            <Image
              src={image}
              alt={title || 'Vehicle Image'}
              width={600}
              height={400}
              className="aspect-3/2 rounded-lg object-cover"
            />
          ) : (
            <Skeleton className="aspect-3/2 w-full" />
          )}
        </div>
        <div className="mt-4 md:mt-0 md:w-1/2 md:pl-8">
          <HeaderSection make={make} title={title} done={done} />
          <SpecsSection specs={specs} done={done} />
          {description ? (
            <p className="mb-4 text-gray-600">{description}</p>
          ) : (
            <Skeleton className="mb-4 h-20 w-full" />
          )}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <UlezCard ulezCompliance={ulezCompliance} done={done} />
            <InfoCard icon={Fingerprint} value={vrm} done={done} />
            <InfoCard
              icon={CarIcon}
              value={bodyType}
              formatter={safeFormatBodyType}
              done={done}
            />
            <InfoCard
              icon={FuelIcon}
              value={fuelType}
              formatter={safeFormatFuelType}
              done={done}
            />
            <InfoCard
              icon={PowerIcon}
              value={transmission}
              formatter={safeFormatTransmission}
              done={done}
            />
            <InfoCard
              icon={GaugeIcon}
              value={
                odoReading !== undefined &&
                odoReading !== null &&
                odoReading > 0 &&
                odoUnit
                  ? `${formatNumber(odoReading)} ${formatOdometerUnit(odoUnit)}`
                  : undefined
              }
              done={done}
            />
            <InfoCard icon={UsersIcon} value={seats} done={done} />
            <InfoCard icon={CarFrontIcon} value={doors} done={done} />
          </div>
        </div>
      </div>
    </div>
  )
}
