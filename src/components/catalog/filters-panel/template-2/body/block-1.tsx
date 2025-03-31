import {
  PriceFilter,
  PriceRangeSliderWithInput,
} from '@/components/filters/render-filters'
import { SearchInput } from '@/components/shared/search-input'
import { SidebarGroup, SidebarGroupContent } from '@/components/ui/sidebar'
import type { ParamsAwaitedProps } from '@/types'

export function Block1({ searchParams }: ParamsAwaitedProps) {
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col justify-between gap-4">
        <SearchInput
          placeholder="Search vehicles..."
          className="w-full rounded-md border px-3 py-2 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
        />
        <PriceRangeSliderWithInput searchParams={searchParams} />
        <PriceFilter searchParams={searchParams} />
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
