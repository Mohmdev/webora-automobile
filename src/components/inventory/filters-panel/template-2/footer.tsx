import {
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { cn } from '@/lib/utils'
import { Plus } from 'lucide-react'

export function PanelFooter({ className }: { className?: string }) {
  return (
    <SidebarFooter className={cn('mt-auto mb-0 border-t', className)}>
      <SidebarMenu className="flex-row justify-between gap-2">
        <SidebarMenuItem>
          <SidebarMenuButton>
            <Plus />
            <span>New Calendar</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <ThemeToggle className="bg-transparent!" />
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  )
}
