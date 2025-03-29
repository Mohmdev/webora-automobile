'use client'

import { Sidebar, SidebarRail } from '@/components/ui/sidebar'
import type { MinMaxProps, SearchAwaitedProps, UserProps } from '@/types'
import { PanelBody } from './body'
import { PanelFooter } from './footer'
import { PanelHeader } from './header'

export function FiltersPanel2({
  minMaxValues,
  searchParams,
  user,
}: SearchAwaitedProps & MinMaxProps & UserProps) {
  return (
    <Sidebar variant="sidebar" collapsible="offcanvas">
      <PanelHeader user={user} />
      <PanelBody minMaxValues={minMaxValues} searchParams={searchParams} />
      <PanelFooter />
      <SidebarRail />
    </Sidebar>
  )
}
