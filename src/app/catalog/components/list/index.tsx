import type { ClassifiedWithImages } from '@/config/types'
import { GridList } from './grid'

interface Template {
  template?: 'grid' | 'list'
}

export type ListProps = {
  classifieds: Promise<ClassifiedWithImages[]>
  favourites: number[]
  className?: string
}

export function ListRecords({ template, ...props }: Template & ListProps) {
  switch (template) {
    case 'grid': {
      return <GridList {...props} />
    }
    default: {
      return <GridList {...props} />
    }
  }
}
