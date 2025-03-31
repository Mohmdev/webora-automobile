import type { QueryReturnMetaProps } from '@/data/catalog'
import type { FavouritesProps, ParamsAwaitedProps, UserProps } from '@/types'
import { Catalog1 } from './templates/catalog-1'
import { Catalog2 } from './templates/catalog-2'

interface Template {
  template?: 'catalog-1' | 'catalog-2'
}

export function Catalog({
  template,
  searchParams,
  favouriteIds,
  user,
  className,
  resultsCount,
}: Template &
  QueryReturnMetaProps &
  ParamsAwaitedProps &
  FavouritesProps &
  UserProps & { className?: string }) {
  const props = {
    searchParams,
    favouriteIds,
    user,
    className,
    resultsCount,
  }

  switch (template) {
    case 'catalog-1': {
      return <Catalog1 {...props} />
    }
    case 'catalog-2': {
      return <Catalog2 {...props} />
    }
    default: {
      return <Catalog2 {...props} />
    }
  }
}
