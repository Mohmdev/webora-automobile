import { useRangeOptions } from '@/hooks/filters/useRangeOptions'
import type { TaxonomyFiltersProps } from '@/types'
import type { CurrencyCode } from '@prisma/client'
import { RangeSelect } from '../ui/range-select'

interface RangeMinMaxProps extends TaxonomyFiltersProps {
  label: string
  minName: string
  maxName: string
  defaultMin: number
  defaultMax: number
  increment?: number
  thousandSeparator?: boolean
  currency?: {
    currencyCode: CurrencyCode
  }
}

export const RangeFilter = (props: RangeMinMaxProps) => {
  const {
    label,
    minName,
    maxName,
    defaultMin,
    defaultMax,
    increment,
    thousandSeparator,
    currency,
    handleChange,
    searchParams,
  } = props

  const { minOptions, maxOptions } = useRangeOptions({
    defaultMin,
    defaultMax,
    increment,
    thousandSeparator,
    currency,
    minName,
    maxName,
    searchParams: searchParams as Record<string, string> | undefined,
  })

  return (
    <RangeSelect
      label={label}
      minSelect={{
        name: minName,
        value: Number(searchParams?.[minName]) || '',
        onChange: handleChange,
        options: minOptions,
      }}
      maxSelect={{
        name: maxName,
        value: Number(searchParams?.[maxName]) || '',
        onChange: handleChange,
        options: maxOptions,
      }}
    />
  )
}
