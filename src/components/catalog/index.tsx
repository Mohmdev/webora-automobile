import type {
  ClassifiedsArrayProps,
  FavouritesProps,
  MinMaxProps,
  SearchAwaitedProps,
  SearchResultProps,
  UserProps,
} from '@/types'
import { Catalog1 } from './templates/catalog-1'
import { Catalog2 } from './templates/catalog-2'

interface Template {
  template?: 'catalog-1' | 'catalog-2'
}

export function Catalog({
  template,
  searchParams,
  classifiedsArray,
  favouriteIds,
  minMaxValues,
  user,
  className,
  totalPages,
  resultCount,
}: Template &
  SearchAwaitedProps &
  MinMaxProps &
  ClassifiedsArrayProps &
  FavouritesProps &
  UserProps &
  SearchResultProps & { className?: string }) {
  const catalog1Props = {
    searchParams,
    classifiedsArray,
    minMaxValues,
    className,
    resultCount,
    favouriteIds,
    totalPages,
  }

  const catalog2Props = {
    searchParams,
    classifiedsArray,
    favouriteIds,
    minMaxValues,
    user,
    className,
    totalPages,
    resultCount,
  }

  switch (template) {
    case 'catalog-1': {
      return <Catalog1 {...catalog1Props} />
    }
    case 'catalog-2': {
      return <Catalog2 {...catalog2Props} />
    }
    default: {
      return <Catalog2 {...catalog2Props} />
    }
  }
}
