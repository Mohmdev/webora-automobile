import { ClassifiedFilterSchema } from '@/app/schemas/classified.schema'
import type { AwaitedPageProps } from '@/config/types'
import {
  BodyType,
  ClassifiedStatus,
  Colour,
  type CurrencyCode,
  CustomerStatus,
  FuelType,
  OdoUnit,
  type Prisma,
  Transmission,
  ULEZCompliance,
} from '@prisma/client'
import { type ClassValue, clsx } from 'clsx'
import { format, parse } from 'date-fns'
import prettyBytes from 'pretty-bytes'
import { twMerge } from 'tailwind-merge'

/**
 * Combines multiple class names and merges Tailwind CSS classes efficiently
 * @param inputs - Class names to combine and merge
 * @returns Merged class names string
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

interface FormatPriceArgs {
  price: number | null
  currency: CurrencyCode | null
}

export function formatUlezCompliance(ulezCompliance: ULEZCompliance) {
  return ulezCompliance === ULEZCompliance.EXEMPT ? 'Exempt' : 'Non-Exempt'
}

export function formatBodyType(bodyType: BodyType) {
  switch (bodyType) {
    case BodyType.CONVERTIBLE:
      return 'Convertible'
    case BodyType.COUPE:
      return 'Coupe'
    case BodyType.HATCHBACK:
      return 'Hatchback'
    case BodyType.SUV:
      return 'SUV'
    case BodyType.WAGON:
      return 'Wagon'
    case BodyType.SEDAN:
      return 'Sedan'
    default:
      return ''
  }
}

export function formatPrice({ price, currency }: FormatPriceArgs) {
  if (!price) {
    return '0'
  }

  const formatter = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currencyDisplay: 'narrowSymbol',
    currency: currency ?? '',
    notation: 'compact',
    compactDisplay: 'short',
  })

  const formatted = formatter.format(price / 100)
  return `${formatted.charAt(0)} ${formatted.substring(1)}`
}

export function formatNumber(
  num: number | null,
  options?: Intl.NumberFormatOptions
) {
  if (num === null || num === undefined) {
    return null
  }

  return new Intl.NumberFormat('en-GB', options).format(num)
}

export function formatOdometerUnit(unit: OdoUnit) {
  return unit === OdoUnit.MILES ? 'mi' : 'km'
}

export function formatTransmission(transmission: Transmission) {
  return transmission === Transmission.AUTOMATIC ? 'Automatic' : 'Manual'
}

export function formatFuelType(fuelType: FuelType) {
  switch (fuelType) {
    case FuelType.PETROL:
      return 'Petrol'
    case FuelType.DIESEL:
      return 'Diesel'
    case FuelType.ELECTRIC:
      return 'Electric'
    case FuelType.HYBRID:
      return 'Hybrid'
    default:
      return ''
  }
}

export function formatColour(colour: Colour) {
  switch (colour) {
    case Colour.BLACK:
      return 'Black'
    case Colour.WHITE:
      return 'White'
    case Colour.SILVER:
      return 'Silver'
    case Colour.RED:
      return 'Red'
    case Colour.BLUE:
      return 'Blue'
    case Colour.BROWN:
      return 'Brown'
    case Colour.GOLD:
      return 'Gold'
    case Colour.GREEN:
      return 'Green'
    case Colour.GREY:
      return 'Grey'
    case Colour.ORANGE:
      return 'Orange'
    case Colour.PINK:
      return 'Pink'
    case Colour.PURPLE:
      return 'Purple'
    case Colour.YELLOW:
      return 'Yellow'
    default:
      return ''
  }
}

function mapTaxonomyFilter(key: string, value: string) {
  return { [key]: { id: Number(value) } }
}

function mapEnumFilter(key: string, value: string) {
  return { [key]: value.toUpperCase() }
}

function mapNumFilter(key: string, value: string) {
  return { [key]: Number(value) }
}

function mapRangeFilter(
  key: string,
  value: string,
  acc: Record<string, unknown>,
  rangeFilters: Record<string, string>
) {
  const field = rangeFilters[key as keyof typeof rangeFilters]
  acc[field] = acc[field] || {}

  if (key.startsWith('min')) {
    ;(acc[field] as Record<string, number>).gte = Number(value)
  } else if (key.startsWith('max')) {
    ;(acc[field] as Record<string, number>).lte = Number(value)
  }

  return acc
}

export const buildClassifiedFilterQuery = (
  searchParams: AwaitedPageProps['searchParams'] | undefined
): Prisma.ClassifiedWhereInput => {
  const { data } = ClassifiedFilterSchema.safeParse(searchParams)

  if (!data) {
    return { status: ClassifiedStatus.LIVE }
  }

  const keys = Object.keys(data)

  const taxonomyFilters = ['make', 'model', 'modelVariant']

  const rangeFilters = {
    minYear: 'year',
    maxYear: 'year',
    minPrice: 'price',
    maxPrice: 'price',
    minReading: 'odoReading',
    maxReading: 'odoReading',
  }

  const numFilters = ['seats', 'doors']
  const enumFilters = [
    'odoUnit',
    'currency',
    'transmission',
    'bodyType',
    'fuelType',
    'colour',
    'ulezCompliance',
  ]

  const mapParamsToFields = keys.reduce(
    (acc, key) => {
      const value = searchParams?.[key] as string | undefined
      if (!value) {
        return acc
      }

      if (taxonomyFilters.includes(key)) {
        const result = mapTaxonomyFilter(key, value)
        Object.assign(acc, result)
        return acc
      }

      if (enumFilters.includes(key)) {
        const result = mapEnumFilter(key, value)
        Object.assign(acc, result)
        return acc
      }

      if (numFilters.includes(key)) {
        const result = mapNumFilter(key, value)
        Object.assign(acc, result)
        return acc
      }

      if (key in rangeFilters) {
        return mapRangeFilter(key, value, acc, rangeFilters)
      }

      return acc
    },
    {} as Record<string, unknown>
  )

  return {
    status: ClassifiedStatus.LIVE,
    ...(searchParams?.q && {
      OR: [
        {
          title: {
            contains: searchParams.q as string,
            mode: 'insensitive',
          },
        },

        {
          description: {
            contains: searchParams.q as string,
            mode: 'insensitive',
          },
        },
      ],
    }),
    ...mapParamsToFields,
  }
}

export const generateTimeOptions = () => {
  const times: { label: string; value: string }[] = []
  const startHour = 8
  const endHour = 18

  for (let hour = startHour; hour < endHour; hour++) {
    const date = new Date()
    date.setDate(date.getDate() + 1)
    date.setHours(hour)
    date.setMinutes(0)

    const formattedTime = date.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    })

    times.push({
      label: formattedTime,
      value: formattedTime,
    })
  }
  return times
}

export const generateDateOptions = () => {
  const today = new Date()
  const dates: { label: string; value: string }[] = []
  for (let i = 0; i < 30; i++) {
    const date = new Date(today)
    date.setDate(today.getDate() + i)
    dates.push({
      label: format(date, 'dd MMM yyyy'),
      value: format(date, 'dd MMM yyyy'),
    })
  }
  return dates
}

export const formatDate = (date: string, time: string) => {
  const parsedDate = parse(date, 'dd MMM yyyy', new Date())
  const parsedTime = parse(time, 'hh:mm aa', new Date())

  parsedDate.setHours(parsedTime.getHours(), parsedTime.getMinutes(), 0, 0)

  return parsedDate
}

export function calculatePercentageChange(current: number, previous: number) {
  if (previous === 0) {
    if (current > 0) {
      return 100
    }
    if (current < 0) {
      return -100
    }
    return 0
  }

  return ((current - previous) / Math.abs(previous)) * 100
}

export const convertToMb = (bytes: number) => {
  return prettyBytes(bytes, {
    bits: false,
    maximumFractionDigits: 1,
    space: false,
  })
}

export function generateYears(minYear: number, maxYear?: number): string[] {
  const currentYear = maxYear ? maxYear : new Date().getFullYear()
  const years: string[] = []

  for (let year = currentYear; year >= minYear; year--) {
    years.push(`${year}`)
  }

  return years
}

export function formatClassifiedStatus(status: ClassifiedStatus) {
  switch (status) {
    case ClassifiedStatus.LIVE:
      return 'Live'
    case ClassifiedStatus.SOLD:
      return 'Sold'
    case ClassifiedStatus.DRAFT:
      return 'Draft'
    default:
      return ''
  }
}

export function formatCustomerStatus(status: CustomerStatus) {
  switch (status) {
    case CustomerStatus.COLD:
      return 'Cold'
    case CustomerStatus.CONTACTED:
      return 'Contacted'
    case CustomerStatus.INTERESTED:
      return 'Interested'
    case CustomerStatus.PURCHASED:
      return 'Purchased'
    case CustomerStatus.SUBSCRIBER:
      return 'Subscriber'
    default:
      return ''
  }
}
