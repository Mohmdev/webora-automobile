import { Sidebar, SidebarRail } from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'
import type { ParamsAwaitedProps } from '@/types'
import { PanelBody } from './body'
import { PanelFooter } from './footer'
import { PanelHeader } from './header'

export function FiltersPanel2({
  searchParams,
  className,
}: ParamsAwaitedProps & { className?: string }) {
  return (
    <Sidebar
      variant="sidebar"
      collapsible="offcanvas"
      className={cn(className)}
    >
      <PanelHeader />
      <PanelBody searchParams={searchParams} />
      <PanelFooter />
      <SidebarRail />
    </Sidebar>
  )
}
