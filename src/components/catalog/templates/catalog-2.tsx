import { FiltersPanel } from '@/components/catalog/archive/filters-panel'
import { SidebarProvider } from '@/components/ui/sidebar'
import type {
  ClassifiedsArrayProps,
  FavouritesProps,
  MinMaxProps,
  SearchAwaitedProps,
  SearchResultProps,
  UserProps,
} from '@/types'
import { ContentPanel } from '../archive/content-panel'

export function Catalog2({
  searchParams,
  classifiedsArray,
  favouriteIds,
  minMaxValues = {
    _min: { year: 0, price: 0, odoReading: 0 },
    _max: { year: 0, price: 0, odoReading: 0 },
  },
  user,
  className,
  totalPages,
  resultCount,
}: SearchAwaitedProps &
  ClassifiedsArrayProps &
  FavouritesProps &
  MinMaxProps &
  SearchResultProps &
  UserProps & { className?: string }) {
  return (
    <SidebarProvider className={className}>
      <FiltersPanel
        template="panel-2"
        user={user}
        minMaxValues={minMaxValues}
        searchParams={searchParams}
      />
      <ContentPanel
        template="panel-2"
        classifiedsArray={classifiedsArray}
        favouriteIds={favouriteIds}
        totalPages={totalPages}
        resultCount={resultCount}
        minMaxValues={minMaxValues}
      />
    </SidebarProvider>
  )
}
