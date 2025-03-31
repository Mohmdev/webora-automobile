import { FiltersPanel } from '@/components/catalog/filters-panel'
import { cn } from '@/lib/utils'
import type { FavouritesProps, ParamsAwaitedProps } from '@/types'
import { ContentPanel } from '../content-panel'

export function Catalog1(
  props: ParamsAwaitedProps & FavouritesProps & { className?: string }
) {
  const { searchParams, favouriteIds, className } = props

  return (
    <div className={cn('flex', className)}>
      <FiltersPanel template="template-1" searchParams={searchParams} />

      <ContentPanel
        template="template-1"
        favouriteIds={favouriteIds}
        searchParams={searchParams}
      />
    </div>
  )
}
