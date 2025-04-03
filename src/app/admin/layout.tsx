import { AdminLayout } from '@/components/layouts/admin-layout'
import type { PropsWithChildren } from 'react'

export default function AdminRootLayout({ children }: PropsWithChildren) {
  return <AdminLayout>{children}</AdminLayout>
}
