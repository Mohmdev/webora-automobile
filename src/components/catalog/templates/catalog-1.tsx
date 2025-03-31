import { FiltersPanel } from '@/components/catalog/filters-panel'
import type { QueryReturnMetaProps } from '@/data/catalog'
import { cn } from '@/lib/utils'
import type { FavouritesProps, ParamsAwaitedProps } from '@/types'
import { ContentPanel } from '../content-panel'

export function Catalog1(
  props: QueryReturnMetaProps &
    ParamsAwaitedProps &
    FavouritesProps & { className?: string }
) {
  const { searchParams, favouriteIds, resultsCount, className } = props

  return (
    <div className={cn('flex', className)}>
      <FiltersPanel template="template-1" searchParams={searchParams} />

      <ContentPanel
        template="template-1"
        favouriteIds={favouriteIds}
        searchParams={searchParams}
        resultsCount={resultsCount}
      />
    </div>
  )
}
