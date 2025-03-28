'use client'

import { Sidebar, SidebarRail } from '@/components/ui/sidebar'
import type { MinMaxProps, SearchAwaitedProps, UserProps } from '@/types'
import { SidebarContent } from './content'
import { SidebarFooter } from './footer'
import { SidebarHeader } from './header'

export function FiltersPanel2({
  minMaxValues,
  searchParams,
  user,
}: SearchAwaitedProps & MinMaxProps & UserProps) {
  return (
    <Sidebar variant="sidebar" collapsible="offcanvas">
      <SidebarHeader user={user} />
      <SidebarContent minMaxValues={minMaxValues} searchParams={searchParams} />
      <SidebarFooter />
      <SidebarRail />
    </Sidebar>
  )
}
