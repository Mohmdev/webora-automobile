'use client'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useSidebarFilters } from '@/hooks/filters/useSidebarFilters'
import type { MinMaxProps, ParamsAwaitedProps } from '@/types'
import { useState } from 'react'

export function PriceFilter({
  minMaxValues,
  searchParams,
}: ParamsAwaitedProps & MinMaxProps) {
  const { handleChange } = useSidebarFilters(
    searchParams as Record<string, string>
  )
  // const { _min, _max } = minMaxValues
  const [activeTab, setActiveTab] = useState<string>('slider')

  return (
    <Tabs
      defaultValue="slider"
      value={activeTab}
      onValueChange={setActiveTab}
      className="w-full"
    >
      <TabsList className="mb-4 grid w-full grid-cols-2">
        <TabsTrigger value="select">Select Range</TabsTrigger>
        <TabsTrigger value="slider">Slider Range</TabsTrigger>
      </TabsList>
      {/* <TabsContent value="select">
        <RangeFilter
          label="Price"
          minName="minPrice"
          maxName="maxPrice"
          defaultMin={_min.price || 0}
          defaultMax={_max.price || 21474836}
          handleChange={handleChange}
          searchParams={searchParams}
          increment={1000000}
          thousandSeparator
          currency={{
            currencyCode: 'GBP',
          }}
        />
      </TabsContent> */}
      <TabsContent value="slider">
        {/* <PriceRangeSliderWithInput
          minMaxValues={minMaxValues}
          searchParams={searchParams}
        /> */}
      </TabsContent>
    </Tabs>
  )
}
