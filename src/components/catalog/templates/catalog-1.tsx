import { FiltersPanel } from '@/components/catalog/filters-panel'
import { cn } from '@/lib/utils'
import type {
  FavouritesProps,
  MinMaxProps,
  ParamsAwaitedProps,
  RecordsPromiseProps,
} from '@/types'
import { ContentPanel } from '../content-panel'

export function Catalog1({
  searchParams,
  records,
  minMaxValues = {
    _min: { year: 0, price: 0, odoReading: 0 },
    _max: { year: 0, price: 0, odoReading: 0 },
  },
  className,
  favouriteIds,
}: MinMaxProps &
  ParamsAwaitedProps &
  RecordsPromiseProps &
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
        records={records}
        favouriteIds={favouriteIds}
        minMaxValues={minMaxValues}
        searchParams={searchParams}
      />
    </div>
  )
}
