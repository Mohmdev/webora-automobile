import type { RecordProps } from '@/types'
import { Card1 } from './card-1'
import { Card2 } from './card-2'
import { SkeletonCard } from './card-skeleton'

interface Template {
  template?: 'card-1' | 'card-2' | 'skeleton'
}

export function Record({ template, ...props }: Template & RecordProps) {
  switch (template) {
    case 'card-1': {
      return <Card1 {...props} />
    }
    case 'card-2': {
      return <Card2 {...props} />
    }
    case 'skeleton': {
      return <SkeletonCard {...props} />
    }
    default: {
      return <Card1 {...props} />
    }
  }
}
