import { NavUser } from '@/app/catalog/components/_sub/nav-user'
import { SidebarHeader as SidebarHeaderComponent } from '@/components/ui/sidebar'

interface SidebarHeaderProps {
  data?: {
    name: string
    email: string
    avatar: string
  }
}

export function SidebarHeader({ data }: SidebarHeaderProps) {
  return (
    <SidebarHeaderComponent className="h-16 border-sidebar-border border-b">
      <NavUser
        user={{
          name: data?.name ?? '',
          email: data?.email ?? '',
          avatar: data?.avatar ?? '',
        }}
      />
    </SidebarHeaderComponent>
  )
}
