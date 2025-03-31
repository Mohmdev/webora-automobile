'use client'

import type { QueryReturnMetaProps } from '@/_data/catalog'
import { Sidebar, SidebarRail } from '@/components/ui/sidebar'
import type { ParamsAwaitedProps, UserProps } from '@/types'
import { PanelBody } from './body'
import { PanelFooter } from './footer'
import { PanelHeader } from './header'

export function FiltersPanel2({
  minMaxValues,
  searchParams,
  user,
  recordsWithPrice,
}: ParamsAwaitedProps & QueryReturnMetaProps & UserProps) {
  return (
    <Sidebar variant="sidebar" collapsible="offcanvas">
      <PanelHeader user={user} />
      <PanelBody
        minMaxValues={minMaxValues}
        searchParams={searchParams}
        recordsWithPrice={recordsWithPrice}
      />
      <PanelFooter />
      <SidebarRail />
    </Sidebar>
  )
}
