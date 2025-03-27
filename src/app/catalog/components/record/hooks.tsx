import { routes } from '@/config/routes'
import type { ClassifiedWithImages } from '@/config/types'
import {
  formatColour,
  formatFuelType,
  formatNumber,
  formatOdometerUnit,
  formatPrice,
  formatTransmission,
} from '@/lib/utils'
import { Cog, Fuel, GaugeCircle, Paintbrush2 } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export function useRecordState(
  classified: ClassifiedWithImages,
  favourites: number[]
) {
  const pathname = usePathname()
  const [isFavourite, setIsFavourite] = useState(
    favourites.includes(classified.id)
  )
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    if (!isFavourite && pathname === routes.favourites) {
      setIsVisible(false)
    }
  }, [isFavourite, pathname])

  return {
    isFavourite,
    setIsFavourite,
    isVisible,
  }
}

export function useRecordData(classified: ClassifiedWithImages) {
  const formattedPrice = formatPrice({
    price: classified.price,
    currency: classified.currency,
  })

  return {
    formattedPrice,
    classifiedInfo: getKeyClassifiedInfo(classified),
  }
}

export const getKeyClassifiedInfo = (classified: ClassifiedWithImages) => {
  return [
    {
      id: 'odoReading',
      icon: <GaugeCircle className="h-4 w-4" />,
      value: `${formatNumber(classified.odoReading)} ${formatOdometerUnit(classified.odoUnit)}`,
    },
    {
      id: 'transmission',
      icon: <Cog className="h-4 w-4" />,
      value: classified?.transmission
        ? formatTransmission(classified?.transmission)
        : null,
    },
    {
      id: 'fuelType',
      icon: <Fuel className="h-4 w-4" />,
      value: classified?.fuelType ? formatFuelType(classified.fuelType) : null,
    },
    {
      id: 'colour',
      icon: <Paintbrush2 className="h-4 w-4" />,
      value: classified?.colour ? formatColour(classified.colour) : null,
    },
  ]
}
