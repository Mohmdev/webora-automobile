import type {
  ClassifiedsArrayProps,
  FavouritesProps,
  MinMaxProps,
  SearchAwaitedProps,
} from '@/types'
import { ContentPanel1 } from './template-1'
import { ContentPanel2 } from './template-2'

interface Template {
  template?: 'template-1' | 'template-2'
}

export function ContentPanel({
  template,
  classifiedsArray,
  favouriteIds,
  className,
  minMaxValues,
  searchParams,
}: Template &
  SearchAwaitedProps &
  ClassifiedsArrayProps &
  FavouritesProps &
  MinMaxProps & { className?: string }) {
  const panel1Props = {
    classifiedsArray,
    favouriteIds,
    className,
    minMaxValues,
    searchParams,
  }

  const panel2Props = {
    searchParams,
    classifiedsArray,
    favouriteIds,
    className,
  }

  switch (template) {
    case 'template-1': {
      return <ContentPanel1 {...panel1Props} />
    }
    case 'template-2': {
      return <ContentPanel2 {...panel2Props} />
    }
    default: {
      return <ContentPanel1 {...panel1Props} />
    }
  }
}
