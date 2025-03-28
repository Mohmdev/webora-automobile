import type {
  ClassifiedsArrayProps,
  FavouritesProps,
  MinMaxProps,
  SearchAwaitedProps,
  SearchResultProps,
} from '@/types'
import { ContentPanel1 } from './panel-1'
import { ContentPanel2 } from './panel-2'

interface Template {
  template?: 'panel-1' | 'panel-2'
}

export function ContentPanel({
  template,
  classifiedsArray,
  favouriteIds,
  className,
  resultCount,
  minMaxValues,
  searchParams,
  totalPages,
}: Template &
  SearchAwaitedProps &
  ClassifiedsArrayProps &
  FavouritesProps &
  MinMaxProps &
  SearchResultProps & { className?: string }) {
  const panel1Props = {
    classifiedsArray,
    favouriteIds,
    className,
    resultCount,
    minMaxValues,
    searchParams,
    totalPages,
  }

  const panel2Props = {
    classifiedsArray,
    favouriteIds,
    className,
  }

  switch (template) {
    case 'panel-1': {
      return <ContentPanel1 {...panel1Props} />
    }
    case 'panel-2': {
      return <ContentPanel2 {...panel2Props} />
    }
    default: {
      return <ContentPanel1 {...panel1Props} />
    }
  }
}
