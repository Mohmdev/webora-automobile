import { NavUser } from '@/components/catalog/_sub/nav-user'
import { SidebarHeader as SidebarHeaderComponent } from '@/components/ui/sidebar'

interface SidebarHeaderProps {
  user?: {
    name: string
    email: string
    avatar: string
  }
}

export function SidebarHeader({ user }: SidebarHeaderProps) {
  return (
    <SidebarHeaderComponent className="h-16 border-sidebar-border border-b">
      <NavUser
        user={{
          name: user?.name ?? '',
          email: user?.email ?? '',
          avatar: user?.avatar ?? '',
        }}
      />
    </SidebarHeaderComponent>
  )
}
