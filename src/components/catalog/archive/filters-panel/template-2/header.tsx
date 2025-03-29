import { NavUser } from '@/components/catalog/_sub/nav-user'
import { SidebarHeader } from '@/components/ui/sidebar'

interface PanelHeaderProps {
  user?: {
    name: string
    email: string
    avatar: string
  }
}

export function PanelHeader({ user }: PanelHeaderProps) {
  return (
    <SidebarHeader className="h-16 border-sidebar-border border-b">
      <NavUser
        user={{
          name: user?.name ?? '',
          email: user?.email ?? '',
          avatar: user?.avatar ?? '',
        }}
      />
    </SidebarHeader>
  )
}
