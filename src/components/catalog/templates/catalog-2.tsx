import { FiltersPanel } from '@/components/catalog/filters-panel'
import { SidebarProvider } from '@/components/ui/sidebar'
import type { FavouritesProps, ParamsAwaitedProps } from '@/types'
import { ContentPanel } from '../content-panel'

export function Catalog2({
  searchParams,
  favouriteIds,
  className,
}: ParamsAwaitedProps & FavouritesProps & { className?: string }) {
  return (
    <SidebarProvider className={className}>
      <FiltersPanel template="template-2" searchParams={searchParams} />
      <ContentPanel
        template="template-2"
        favouriteIds={favouriteIds}
        searchParams={searchParams}
      />
    </SidebarProvider>
  )
}
