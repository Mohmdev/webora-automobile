import { FiltersPanel } from '@/components/catalog/archive/filters-panel'
import { cn } from '@/lib/utils'
import type {
  ClassifiedsArrayProps,
  FavouritesProps,
  MinMaxProps,
  SearchAwaitedProps,
  SearchResultProps,
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
  resultCount,
  favouriteIds,
  totalPages,
}: MinMaxProps &
  SearchAwaitedProps &
  ClassifiedsArrayProps &
  FavouritesProps &
  SearchResultProps & { className?: string }) {
  return (
    <div className={cn('flex', className)}>
      <FiltersPanel
        template="panel-1"
        minMaxValues={minMaxValues}
        searchParams={searchParams}
      />

      <ContentPanel
        template="panel-1"
        classifiedsArray={classifiedsArray}
        favouriteIds={favouriteIds}
        resultCount={resultCount}
        minMaxValues={minMaxValues}
        searchParams={searchParams}
        totalPages={totalPages}
      />
    </div>
  )
}
