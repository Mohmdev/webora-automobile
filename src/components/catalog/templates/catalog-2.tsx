import { FiltersPanel } from '@/components/catalog/filters-panel'
import { SidebarProvider } from '@/components/ui/sidebar'
import type { ResolvedParams } from '@/types'
import { ContentPanel } from '../content-panel'

export function Catalog2({
  searchParams,
  className,
}: ResolvedParams & { className?: string }) {
  return (
    <SidebarProvider className={className}>
      <FiltersPanel template="template-2" searchParams={searchParams} />
      <ContentPanel template="template-2" searchParams={searchParams} />
    </SidebarProvider>
  )
}
