import { Sidebar, SidebarRail } from '@/components/ui/sidebar'
import type { ParamsAwaitedProps } from '@/types'
import { PanelBody } from './body'
import { PanelFooter } from './footer'
import { PanelHeader } from './header'

export function FiltersPanel2({ searchParams }: ParamsAwaitedProps) {
  return (
    <Sidebar variant="sidebar" collapsible="offcanvas">
      <PanelHeader />
      <PanelBody searchParams={searchParams} />
      <PanelFooter />
      <SidebarRail />
    </Sidebar>
  )
}
