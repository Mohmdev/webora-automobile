import { AppSidebar } from '@/app/catalog/components/sidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { ListRecords } from '../list'
import { Header } from './header'

export function Archive() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <div className="flex flex-1 flex-col gap-4 p-4">
          <ListRecords template="grid" />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
