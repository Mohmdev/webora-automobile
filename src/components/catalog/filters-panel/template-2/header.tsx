import { NavUser } from '@/components/catalog/_sub/nav-user'
import { SidebarHeader } from '@/components/ui/sidebar'

export function PanelHeader() {
  return (
    <SidebarHeader className="h-16 border-sidebar-border border-b">
      <NavUser />
    </SidebarHeader>
  )
}
