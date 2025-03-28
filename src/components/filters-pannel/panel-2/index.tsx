'use client'

import { Sidebar, SidebarRail } from '@/components/ui/sidebar'
import type { SidebarProps } from '@/types'
import type React from 'react'
import { SidebarContent } from './content'
import { SidebarFooter } from './footer'
import { SidebarHeader } from './header'

export type AppSidebarProps = React.ComponentProps<typeof Sidebar> &
  SidebarProps & {
    user: {
      name: string
      email: string
      avatar: string
    }
  }

export function AppSidebar(props: AppSidebarProps) {
  const { minMaxValues, searchParams, user } = props

  return (
    <Sidebar variant="sidebar" collapsible="offcanvas">
      <SidebarHeader user={user} />
      <SidebarContent minMaxValues={minMaxValues} searchParams={searchParams} />
      <SidebarFooter />
      <SidebarRail />
    </Sidebar>
  )
}
