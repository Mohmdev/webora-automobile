'use client'

import { Sidebar, SidebarRail } from '@/components/ui/sidebar'
import type { SidebarProps } from '@/types'
import { SidebarContent } from './content'
import { SidebarFooter } from './footer'
import { SidebarHeader } from './header'

export function FiltersPanel2({
  minMaxValues,
  searchParams,
  user,
}: SidebarProps & {
  user?: {
    name: string
    email: string
    avatar: string
  }
}) {
  return (
    <Sidebar variant="sidebar" collapsible="offcanvas">
      <SidebarHeader user={user} />
      <SidebarContent minMaxValues={minMaxValues} searchParams={searchParams} />
      <SidebarFooter />
      <SidebarRail />
    </Sidebar>
  )
}
