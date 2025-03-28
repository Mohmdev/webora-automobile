import type { ClassifiedProps, FavouritesProps } from '@/types'
import { Card1 } from './card-1'
import { Card2 } from './card-2'
import { SkeletonCard1 } from './card-skeleton-1'
import { SkeletonCard2 } from './card-skeleton-2'
interface Template {
  template?: 'card-1' | 'card-2' | 'skeleton-1' | 'skeleton-2'
}

export function Record({
  template,
  classified,
  favouriteIds,
  className,
}: Template & ClassifiedProps & FavouritesProps & { className?: string }) {
  const recordProps = {
    classified,
    favouriteIds,
    className,
  }

  switch (template) {
    case 'card-1': {
      return <Card1 {...recordProps} />
    }
    case 'card-2': {
      return <Card2 {...recordProps} />
    }
    case 'skeleton-1': {
      return <SkeletonCard1 />
    }
    case 'skeleton-2': {
      return <SkeletonCard2 />
    }
    default: {
      return <Card2 {...recordProps} />
    }
  }
}
