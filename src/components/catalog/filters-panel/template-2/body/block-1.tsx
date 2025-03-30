import {
  PriceFilter,
  PriceRangeSliderWithInput,
} from '@/components/filters/render-filters'
import { SearchInput } from '@/components/shared/search-input'
import { SidebarGroup, SidebarGroupContent } from '@/components/ui/sidebar'
import { prisma } from '@/lib/prisma'
import { buildClassifiedFilterQuery } from '@/lib/utils'
import type { MinMaxProps, ParamsAwaitedProps } from '@/types'

export async function Block1({
  searchParams,
  minMaxValues,
}: ParamsAwaitedProps & MinMaxProps) {
  const resultCount = await prisma.classified.count({
    where: buildClassifiedFilterQuery(searchParams),
  })
  const classifiedsWithPrice = await prisma.classified.findMany({
    where: buildClassifiedFilterQuery(searchParams),
    select: {
      price: true,
    },
  })

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col justify-between gap-4">
        <SearchInput
          placeholder="Search vehicles..."
          className="w-full rounded-md border px-3 py-2 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
        />
        <PriceRangeSliderWithInput
          minMaxValues={minMaxValues}
          searchParams={searchParams}
          resultCount={resultCount}
          items={classifiedsWithPrice}
        />
        <PriceFilter minMaxValues={minMaxValues} searchParams={searchParams} />
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
