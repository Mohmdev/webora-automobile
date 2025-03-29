'use client'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { useSliderWithInput } from '@/hooks/use-slider-with-input'
import { useId } from 'react'
import { demoItems } from './price-range-slider-with-input.demo'

export function PriceRangeSliderWithInput() {
  const id = useId()

  const tick_count = 40
  const minValue = Math.min(...demoItems.map((item) => item.price))
  const maxValue = Math.max(...demoItems.map((item) => item.price))

  const {
    sliderValue,
    inputValues,
    validateAndUpdateValue,
    handleInputChange,
    handleSliderChange,
  } = useSliderWithInput({ minValue, maxValue, initialValue: [200, 780] })

  const priceStep = (maxValue - minValue) / tick_count

  const itemCounts = new Array(tick_count).fill(0).map((_, tick) => {
    const rangeMin = minValue + tick * priceStep
    const rangeMax = minValue + (tick + 1) * priceStep
    return demoItems.filter(
      (item) => item.price >= rangeMin && item.price < rangeMax
    ).length
  })

  const maxCount = Math.max(...itemCounts)

  const handleSliderValueChange = (values: number[]) => {
    handleSliderChange(values)
  }

  const countItemsInRange = (min: number, max: number) => {
    return demoItems.filter((item) => item.price >= min && item.price <= max)
      .length
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
      countItemsInRange(sliderValue[0], sliderValue[1]) > 0 &&
      rangeMin <= sliderValue[1] &&
      rangeMax >= sliderValue[0]
    )
  }

  return (
    <div className="flex-1 space-y-4">
      <div>
        <div className="flex h-12 w-full items-end px-3" aria-hidden="true">
          {itemCounts.map((count, i) => (
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
              className="peer w-full ps-6"
              type="text"
              inputMode="decimal"
              value={inputValues[0]}
              onChange={(e) => handleInputChange(e, 0)}
              onBlur={() => validateAndUpdateValue(inputValues[0], 0)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  validateAndUpdateValue(inputValues[0], 0)
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
              className="peer w-full ps-6"
              type="text"
              inputMode="decimal"
              value={inputValues[1]}
              onChange={(e) => handleInputChange(e, 1)}
              onBlur={() => validateAndUpdateValue(inputValues[1], 1)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  validateAndUpdateValue(inputValues[1], 1)
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

      {/* <ShowResultsButton
        countItemsInRange={countItemsInRange}
        sliderValue={sliderValue}
      /> */}
    </div>
  )
}

// function ShowResultsButton({
//   countItemsInRange,
//   sliderValue,
// }: {
//   countItemsInRange: (min: number, max: number) => number
//   sliderValue: number[]
// }) {
//   return (
//     <Button className="w-full" variant="outline">
//       Show {countItemsInRange(sliderValue[0], sliderValue[1])} items
//     </Button>
//   )
// }
