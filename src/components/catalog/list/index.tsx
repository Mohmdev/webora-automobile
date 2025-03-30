import type { FavouritesProps, RecordsPromiseProps } from '@/types'
import { GridList1 } from './grid-1'
import { GridList2 } from './grid-2'
import { GridSkeleton1 } from './grid-skeleton-1'

interface Template {
  template?: 'grid-1' | 'grid-2' | 'list' | 'skeleton-1'
}

export function ListRecords({
  template,
  records,
  favouriteIds,
  className,
}: Template & RecordsPromiseProps & FavouritesProps & { className?: string }) {
  const listProps = { records, favouriteIds, className }

  switch (template) {
    case 'grid-1': {
      return <GridList1 {...listProps} />
    }
    case 'grid-2': {
      return <GridList2 {...listProps} />
    }
    case 'skeleton-1': {
      return <GridSkeleton1 />
    }
    default: {
      return <GridList2 {...listProps} />
    }
  }
}
