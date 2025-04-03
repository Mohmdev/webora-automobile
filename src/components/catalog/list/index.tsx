import type { ResolvedParams } from '@/types'
import { GridList1 } from './grid-1'
import { GridList2 } from './grid-2'
import { GridSkeleton1 } from './grid-skeleton-1'

interface Template {
  template?: 'grid-1' | 'grid-2' | 'list' | 'skeleton-1'
}

export function ListRecords({
  template,
  className,
  searchParams,
  isFavouritesList = false,
}: Template &
  ResolvedParams & { className?: string; isFavouritesList?: boolean }) {
  const props = { className, searchParams, isFavouritesList }

  switch (template) {
    case 'grid-1': {
      return <GridList1 {...props} />
    }
    case 'grid-2': {
      return <GridList2 {...props} />
    }
    case 'skeleton-1': {
      return <GridSkeleton1 />
    }
    default: {
      return <GridList2 {...props} />
    }
  }
}
