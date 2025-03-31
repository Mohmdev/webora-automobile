import type { QueryReturnMetaProps } from '@/_data/catalog'
import { FiltersPanel } from '@/components/catalog/filters-panel'
import { cn } from '@/lib/utils'
import type {
  FavouritesProps,
  ParamsAwaitedProps,
  RecordsPromiseProps,
} from '@/types'
import { ContentPanel } from '../content-panel'

export function Catalog1(
  props: QueryReturnMetaProps &
    ParamsAwaitedProps &
    RecordsPromiseProps &
    FavouritesProps & { className?: string }
) {
  const {
    searchParams,
    records,
    favouriteIds,
    minMaxValues,
    resultsCount,
    className,
  } = props

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
        resultsCount={resultsCount}
      />
    </div>
  )
}
