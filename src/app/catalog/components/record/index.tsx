import type { ClassifiedWithImages } from '@/config/types'
import { Card1 } from './card-1'
import { SkeletonCard } from './card-skeleton'
interface Template {
  template?: 'card-1' | 'card-2' | 'skeleton'
}

export type RecordProps = {
  classified: ClassifiedWithImages
  favourites: number[]
  className?: string
}

export function Record({ template, ...props }: Template & RecordProps) {
  switch (template) {
    case 'card-1': {
      return <Card1 {...props} />
    }
    case 'skeleton': {
      return <SkeletonCard {...props} />
    }
    default: {
      return <Card1 {...props} />
    }
  }
}
