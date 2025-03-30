import { TaxonomyFiltersBlock } from '@/components/filters/render-filters'
import { SidebarGroup, SidebarGroupContent } from '@/components/ui/sidebar'
import type { ParamsAwaitedProps } from '@/types'

export function Block2({ searchParams }: ParamsAwaitedProps) {
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col justify-between gap-4">
        <TaxonomyFiltersBlock searchParams={searchParams} />
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
