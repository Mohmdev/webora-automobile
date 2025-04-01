import { TaxonomyFiltersBlock } from '@/components/filters/render-filters'
import { SidebarGroup, SidebarGroupContent } from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'
import type { ParamsAwaitedProps } from '@/types'

export function Block2({
  searchParams,
  className,
}: ParamsAwaitedProps & { className?: string }) {
  return (
    <SidebarGroup className={cn(className)}>
      <SidebarGroupContent className="flex flex-col justify-between gap-4">
        <TaxonomyFiltersBlock searchParams={searchParams} />
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
