'use client'

import { formatNumber, formatPrice } from '@/lib/utils'
import type { FilterOptions } from '@/types'
import type { CurrencyCode } from '@prisma/client'
import { useEffect, useState } from 'react'

interface RangeOptionsProps {
  defaultMin: number
  defaultMax: number
  increment?: number
  thousandSeparator?: boolean
  currency?: {
    currencyCode: CurrencyCode
  }
  minName: string
  maxName: string
  searchParams?: Record<string, string>
}

interface RangeOptionsState {
  minOptions: FilterOptions<string, number>
  maxOptions: FilterOptions<string, number>
}

export function useRangeOptions({
  defaultMin,
  defaultMax,
  increment,
  thousandSeparator,
  currency,
  minName,
  maxName,
  searchParams,
}: RangeOptionsProps): RangeOptionsState {
  const getInitialState = () => {
    const state: FilterOptions<string, number> = []
    let iterator = defaultMin - (increment ?? 1)

    do {
      if (increment) {
        iterator += increment
      } else {
        iterator++
      }

      if (currency) {
        state.push({
          label: formatPrice({
            price: iterator,
            currency: currency.currencyCode,
          }),
          value: iterator,
        })
      } else if (thousandSeparator) {
        state.push({
          label: formatNumber(iterator) ?? iterator.toString(),
          value: iterator,
        })
      } else {
        state.push({ label: iterator.toString(), value: iterator })
      }
    } while (iterator < defaultMax)

    return state
  }

  const initialState = getInitialState()

  const [minOptions, setMinOptions] =
    useState<FilterOptions<string, number>>(initialState)
  const [maxOptions, setMaxOptions] = useState<FilterOptions<string, number>>(
    initialState.toReversed()
  )

  useEffect(() => {
    if (searchParams?.[minName]) {
      setMaxOptions(
        initialState.filter(
          ({ value }) => value > Number(searchParams[minName])
        )
      )
    }
    if (searchParams?.[maxName]) {
      setMinOptions(
        initialState.filter(
          ({ value }) => value < Number(searchParams[maxName])
        )
      )
    }
  }, [
    searchParams?.[minName],
    searchParams?.[maxName],
    initialState,
    minName,
    maxName,
  ])

  return {
    minOptions,
    maxOptions,
  }
}
