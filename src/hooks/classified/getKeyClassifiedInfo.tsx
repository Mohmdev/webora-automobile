import {
  formatColour,
  formatFuelType,
  formatNumber,
  formatOdometerUnit,
  formatTransmission,
} from '@/lib/utils'
import type { ClassifiedData } from '@/types'
import { Cog, Fuel, GaugeCircle, Paintbrush2 } from 'lucide-react'

export const getKeyClassifiedInfo = (classified: ClassifiedData) => {
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
