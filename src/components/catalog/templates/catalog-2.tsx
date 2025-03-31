import type { QueryReturnMetaProps } from '@/_data/catalog'
import { FiltersPanel } from '@/components/catalog/filters-panel'
import { SidebarProvider } from '@/components/ui/sidebar'
import type {
  FavouritesProps,
  ParamsAwaitedProps,
  RecordsPromiseProps,
  UserProps,
} from '@/types'
import { ContentPanel } from '../content-panel'

export function Catalog2({
  searchParams,
  records,
  favouriteIds,
  minMaxValues = {
    _min: { year: 0, price: 0, odoReading: 0 },
    _max: { year: 0, price: 0, odoReading: 0 },
  },
  user,
  className,
  recordsWithPrice,
}: ParamsAwaitedProps &
  RecordsPromiseProps &
  FavouritesProps &
  QueryReturnMetaProps &
  UserProps & { className?: string }) {
  return (
    <SidebarProvider className={className}>
      <FiltersPanel
        template="template-2"
        user={user}
        minMaxValues={minMaxValues}
        searchParams={searchParams}
      />
      <ContentPanel
        template="template-2"
        records={records}
        favouriteIds={favouriteIds}
        minMaxValues={minMaxValues}
        searchParams={searchParams}
      />
    </SidebarProvider>
  )
}
