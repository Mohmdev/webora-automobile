import { FiltersPanel } from '@/components/catalog/archive/filters-panel'
import { cn } from '@/lib/utils'
import type {
  ClassifiedsArrayProps,
  FavouritesProps,
  MinMaxProps,
  SearchAwaitedProps,
} from '@/types'
import { ContentPanel } from '../archive/content-panel'

export function Catalog1({
  searchParams,
  classifiedsArray,
  minMaxValues = {
    _min: { year: 0, price: 0, odoReading: 0 },
    _max: { year: 0, price: 0, odoReading: 0 },
  },
  className,
  favouriteIds,
}: MinMaxProps &
  SearchAwaitedProps &
  ClassifiedsArrayProps &
  FavouritesProps & { className?: string }) {
  return (
    <div className={cn('flex', className)}>
      <FiltersPanel
        template="template-1"
        minMaxValues={minMaxValues}
        searchParams={searchParams}
      />

      <ContentPanel
        template="template-1"
        classifiedsArray={classifiedsArray}
        favouriteIds={favouriteIds}
        minMaxValues={minMaxValues}
        searchParams={searchParams}
      />
    </div>
  )
}
