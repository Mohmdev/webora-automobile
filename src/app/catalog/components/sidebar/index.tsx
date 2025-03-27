'use client'

import { Sidebar, SidebarRail } from '@/components/ui/sidebar'
import type { SidebarProps } from '@/config/types'
import type React from 'react'
import { sampleData } from '../../_data'
import { SidebarContent } from './content'
import { SidebarFooter } from './footer'
import { SidebarHeader } from './header'

export type AppSidebarProps = React.ComponentProps<typeof Sidebar> &
  SidebarProps

export function AppSidebar(props: AppSidebarProps) {
  const { minMaxValues, searchParams } = props

  return (
    <Sidebar variant="sidebar" collapsible="offcanvas">
      <SidebarHeader data={sampleData.user} />
      <SidebarContent minMaxValues={minMaxValues} searchParams={searchParams} />
      <SidebarFooter />
      <SidebarRail />
    </Sidebar>
  )
}
