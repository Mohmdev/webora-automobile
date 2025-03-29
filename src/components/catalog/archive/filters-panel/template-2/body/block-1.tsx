import { SearchInput } from '@/components/shared/search-input'
import { SidebarGroup, SidebarGroupContent } from '@/components/ui/sidebar'

import type { SearchAwaitedProps } from '@/types'

export function Block1({ searchParams }: SearchAwaitedProps) {
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col justify-between">
        <SearchInput
          placeholder="Search vehicles..."
          className="w-full rounded-md border px-3 py-2 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
        />
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
