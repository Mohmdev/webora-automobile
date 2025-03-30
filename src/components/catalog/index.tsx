import type {
  FavouritesProps,
  MinMaxProps,
  ParamsAwaitedProps,
  RecordsPromiseProps,
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
  records,
  favouriteIds,
  minMaxValues,
  user,
  className,
}: Template &
  ParamsAwaitedProps &
  MinMaxProps &
  RecordsPromiseProps &
  FavouritesProps &
  UserProps & { className?: string }) {
  const catalog1Props = {
    searchParams,
    records,
    minMaxValues,
    className,
    favouriteIds,
  }

  const catalog2Props = {
    searchParams,
    records,
    favouriteIds,
    minMaxValues,
    user,
    className,
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
