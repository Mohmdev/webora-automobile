import type { QueryReturnMetaProps } from '@/data/catalog'
import type { FavouritesProps, ParamsAwaitedProps } from '@/types'
import { ContentPanel1 } from './template-1'
import { ContentPanel2 } from './template-2'
interface Template {
  template?: 'template-1' | 'template-2'
}

export function ContentPanel({
  template,
  favouriteIds,
  className,
  searchParams,
  resultsCount,
}: Template &
  ParamsAwaitedProps &
  FavouritesProps &
  QueryReturnMetaProps & { className?: string }) {
  const props = {
    favouriteIds,
    className,
    searchParams,
    resultsCount,
  }

  switch (template) {
    case 'template-1': {
      return <ContentPanel1 {...props} />
    }
    case 'template-2': {
      return <ContentPanel2 {...props} />
    }
    default: {
      return <ContentPanel1 {...props} />
    }
  }
}
