import { NavUser } from '@/components/inventory/_sub/nav-user'
import { SidebarHeader } from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'

export function PanelHeader({ className }: { className?: string }) {
  return (
    <SidebarHeader
      className={cn('h-16 border-sidebar-border border-b', className)}
    >
      <NavUser />
    </SidebarHeader>
  )
}
