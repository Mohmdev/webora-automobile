'use client'

import { TaxonomyFilters } from '@/components/filters/taxonomy-filters'
import { SidebarGroup, SidebarGroupContent } from '@/components/ui/sidebar'
import { useSidebarFilters } from '@/hooks/filters/useSidebarFilters'
import type { SearchAwaitedProps } from '@/types'

export function Block2({ searchParams }: SearchAwaitedProps) {
  const { handleChange } = useSidebarFilters(
    searchParams as Record<string, string>
  )

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col justify-between gap-4">
        <TaxonomyFilters
          searchParams={searchParams}
          handleChange={handleChange}
        />
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
