import type { ListProps } from '@/types'
import { GridList1 } from './grid-1'
import { GridList2 } from './grid-2'

interface Template {
  template?: 'grid-1' | 'grid-2' | 'list'
}

export function ListRecords({ template, ...props }: Template & ListProps) {
  switch (template) {
    case 'grid-1': {
      return <GridList1 {...props} />
    }
    case 'grid-2': {
      return <GridList2 {...props} />
    }
    default: {
      return <GridList1 {...props} />
    }
  }
}
