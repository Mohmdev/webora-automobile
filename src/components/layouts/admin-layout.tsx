import { AdminHeader } from '@/components/layouts/header/admin-header'
import { AdminSidebar } from '@/components/layouts/sidebar/admin-sidebar'
import { AiClient } from '@/providers/ai'
import type { PropsWithChildren } from 'react'

export function AdminLayout({ children }: PropsWithChildren) {
  return (
    <AiClient>
      <div className="flex min-h-screen w-full bg-primary-900">
        <AdminSidebar />
        <div className="flex flex-1 flex-col overflow-hidden">
          <AdminHeader />
          <main className="admin-scrollbar flex flex-1 flex-col gap-4 overflow-auto p-4 md:gap-8 md:p-6">
            {children}
          </main>
        </div>
      </div>
    </AiClient>
  )
}
