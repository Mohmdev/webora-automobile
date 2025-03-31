import { FiltersPanel } from '@/components/catalog/filters-panel'
import { SidebarProvider } from '@/components/ui/sidebar'
import type { FavouritesProps, ParamsAwaitedProps, UserProps } from '@/types'
import { ContentPanel } from '../content-panel'

export function Catalog2({
  searchParams,
  favouriteIds,
  user,
  className,
}: ParamsAwaitedProps & FavouritesProps & UserProps & { className?: string }) {
  return (
    <SidebarProvider className={className}>
      <FiltersPanel
        template="template-2"
        user={user}
        searchParams={searchParams}
      />
      <ContentPanel
        template="template-2"
        favouriteIds={favouriteIds}
        searchParams={searchParams}
      />
    </SidebarProvider>
  )
}
