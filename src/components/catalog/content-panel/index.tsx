import type {
  FavouritesProps,
  MinMaxProps,
  ParamsAwaitedProps,
  RecordsPromiseProps,
} from '@/types'
import { ContentPanel1 } from './template-1'
import { ContentPanel2 } from './template-2'

interface Template {
  template?: 'template-1' | 'template-2'
}

export function ContentPanel({
  template,
  records,
  favouriteIds,
  className,
  minMaxValues,
  searchParams,
}: Template &
  ParamsAwaitedProps &
  RecordsPromiseProps &
  FavouritesProps &
  MinMaxProps & { className?: string }) {
  const panel1Props = {
    records,
    favouriteIds,
    className,
    minMaxValues,
    searchParams,
  }

  const panel2Props = {
    searchParams,
    records,
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
