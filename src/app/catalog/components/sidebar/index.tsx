'use client'

import { Sidebar, SidebarRail } from '@/components/ui/sidebar'
import type * as React from 'react'
import { sampleData } from '../../_data'
import { SidebarContent } from './content'
import { SidebarFooter } from './footer'
import { SidebarHeader } from './header'

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader data={sampleData.user} />
      <SidebarContent data={sampleData.calendars} />
      <SidebarFooter />
      <SidebarRail />
    </Sidebar>
  )
}
