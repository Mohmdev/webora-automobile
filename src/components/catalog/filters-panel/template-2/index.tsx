'use client'

import { Sidebar, SidebarRail } from '@/components/ui/sidebar'
import type { ParamsAwaitedProps, UserProps } from '@/types'
import { PanelBody } from './body'
import { PanelFooter } from './footer'
import { PanelHeader } from './header'

export function FiltersPanel2({
  searchParams,
  user,
}: ParamsAwaitedProps & UserProps) {
  return (
    <Sidebar variant="sidebar" collapsible="offcanvas">
      <PanelHeader user={user} />
      <PanelBody searchParams={searchParams} />
      <PanelFooter />
      <SidebarRail />
    </Sidebar>
  )
}
