'use client'

import type { SidebarProps } from '@/config/types'
import { Sidebar } from './sidebar'

export function SidebarWrapper(props: SidebarProps) {
  return <Sidebar {...props} />
}
