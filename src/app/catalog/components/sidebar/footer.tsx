import {
  SidebarFooter as SidebarFooterComponent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { Plus } from 'lucide-react'

export function SidebarFooter() {
  return (
    <SidebarFooterComponent>
      <SidebarMenu className="flex-row justify-between gap-2">
        <SidebarMenuItem>
          <SidebarMenuButton>
            <Plus />
            <span>New Calendar</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <ThemeToggle />
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooterComponent>
  )
}
