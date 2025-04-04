'use client'

import { fetchMinMaxValues, fetchRecordsWithPriceSelect } from '@/_data'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { useFilters } from '@/hooks/filters/use-filters'
import { useSliderWithInput } from '@/hooks/use-slider-with-input'
import { cn } from '@/lib/utils'
import type { ResolvedParams } from '@/types'
import { useQuery } from '@tanstack/react-query'
import type React from 'react'
import { useEffect, useId } from 'react'

export function PriceRangeSliderWithInput({
  searchParams,
  className,
  enableResultsButton = false,
}: ResolvedParams & { className?: string; enableResultsButton?: boolean }) {
  const id = useId()
  const { data: recordsWithPrice } = useQuery({
    queryKey: ['recordsWithPrice', searchParams],
    queryFn: () => fetchRecordsWithPriceSelect(searchParams),
  })
  const { data: minMaxValues } = useQuery({
    queryKey: ['minMaxValues'],
    queryFn: fetchMinMaxValues,
  })
  if (!recordsWithPrice) {
    return null
  }

  ///// USER INTERFACE LOGIC /////

  const { _min, _max } = minMaxValues ?? {}
  const initialMin = _min?.price ?? 0
  const initialMax = _max?.price ?? 1000000

  const minValue = initialMin
  const maxValue = initialMax

  const {
    sliderValue,
    inputValues,
    validateAndUpdateValue,
    handleInputChange,
    handleSliderChange,
  } = useSliderWithInput({
    minValue,
    maxValue,
    initialValue: [initialMin, initialMax],
  })

  const tick_count = 100
  const priceStep = (maxValue - minValue) / tick_count

  const recordCounts = new Array(tick_count).fill(0).map((_, tick) => {
    const rangeMin = minValue + tick * priceStep
    const rangeMax = minValue + (tick + 1) * priceStep
    return recordsWithPrice.filter(
      (record) => record.price >= rangeMin && record.price < rangeMax
    ).length
  })

  const maxCount = Math.max(...recordCounts)

  const countRecordsInRange = (min: number, max: number) => {
    return recordsWithPrice.filter(
      (record) => record.price >= min && record.price <= max
    ).length
  }

  const isBarInSelectedRange = (
    index: number,
    minValue: number,
    priceStep: number,
    sliderValue: number[]
  ) => {
    const rangeMin = minValue + index * priceStep
    const rangeMax = minValue + (index + 1) * priceStep
    return (
      countRecordsInRange(sliderValue[0], sliderValue[1]) > 0 &&
      rangeMin <= sliderValue[1] &&
      rangeMax >= sliderValue[0]
    )
  }

  ///// FILTERING LOGIC /////

  const { setQueryStates } = useFilters(searchParams as Record<string, string>)

  // Add effect to detect when filters are cleared
  useEffect(() => {
    // If minPrice and maxPrice params are removed or empty, reset slider to initial values
    if (!searchParams?.minPrice && !searchParams?.maxPrice) {
      handleSliderChange([initialMin, initialMax])
    }
  }, [
    searchParams?.minPrice,
    searchParams?.maxPrice,
    initialMin,
    initialMax,
    handleSliderChange,
  ])

  // Sync slider changes with URL
  const handleSliderValueChange = (values: number[]) => {
    handleSliderChange(values)

    // Update URL params when slider changes
    setQueryStates({
      minPrice: values[0].toString(),
      maxPrice: values[1].toString(),
    })
  }

  // Sync input field changes with URL
  const handleInputValueChange = (value: string, index: number) => {
    handleInputChange(
      { target: { value } } as React.ChangeEvent<HTMLInputElement>,
      index
    )
  }

  const handleInputValidation = (value: string, index: number) => {
    validateAndUpdateValue(value, index)

    // Update URL params when input is validated
    setQueryStates({
      [index === 0 ? 'minPrice' : 'maxPrice']: sliderValue[index].toString(),
    })
  }

  return (
    <div className={cn('flex-1 space-y-4', className)}>
      <div>
        <div className="flex h-12 w-full items-end px-3" aria-hidden="true">
          {recordCounts.map((count, i) => (
            <div
              key={i}
              className="flex flex-1 justify-center"
              style={{
                height: `${(count / maxCount) * 100}%`,
              }}
            >
              <span
                data-selected={isBarInSelectedRange(
                  i,
                  minValue,
                  priceStep,
                  sliderValue
                )}
                className="h-full w-full bg-primary/20"
              />
            </div>
          ))}
        </div>
        <Slider
          showTooltip
          value={sliderValue}
          onValueChange={handleSliderValueChange}
          min={minValue}
          max={maxValue}
          aria-label="Price range"
        />
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="space-y-1">
          <Label htmlFor={`${id}-min`}>Min price</Label>
          <div className="relative">
            <Input
              id={`${id}-min`}
              className="peer w-full rounded-sm ps-6"
              type="text"
              inputMode="decimal"
              value={inputValues[0]}
              name="minPrice"
              onChange={(e) => handleInputValueChange(e.target.value, 0)}
              onBlur={() => handleInputValidation(inputValues[0], 0)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleInputValidation(inputValues[0], 0)
                }
              }}
              aria-label="Enter minimum price"
            />
            <span className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground text-sm peer-disabled:opacity-50">
              $
            </span>
          </div>
        </div>
        <div className="space-y-1">
          <Label htmlFor={`${id}-max`}>Max price</Label>
          <div className="relative">
            <Input
              id={`${id}-max`}
              className="peer w-full rounded-sm ps-6"
              type="text"
              inputMode="decimal"
              value={inputValues[1]}
              name="maxPrice"
              onChange={(e) => handleInputValueChange(e.target.value, 1)}
              onBlur={() => handleInputValidation(inputValues[1], 1)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleInputValidation(inputValues[1], 1)
                }
              }}
              aria-label="Enter maximum price"
            />
            <span className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground text-sm peer-disabled:opacity-50">
              $
            </span>
          </div>
        </div>
      </div>

      {enableResultsButton && (
        <ShowResultsButton
          count={countRecordsInRange}
          sliderValue={sliderValue}
          setQueryStates={setQueryStates}
        />
      )}
    </div>
  )
}

function ShowResultsButton({
  count,
  sliderValue,
  setQueryStates,
  className,
}: {
  count: (min: number, max: number) => number
  sliderValue: number[]
  setQueryStates: (params: Record<string, string | null>) => void
  className?: string
}) {
  return (
    <Button
      className={cn('w-full flex-1 rounded-sm', className)}
      variant="outline"
      onClick={() => {
        setQueryStates({
          minPrice: sliderValue[0].toString(),
          maxPrice: sliderValue[1].toString(),
        })
      }}
    >
      Show {count(sliderValue[0], sliderValue[1])} items
    </Button>
  )
}
