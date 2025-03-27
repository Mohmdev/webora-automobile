import { GridList } from './grid'

interface Template {
  template?: 'grid' | 'list'
}

export interface ListRecordsProps {
  className?: string
}

export function ListRecords({
  template,
  ...props
}: Template & ListRecordsProps) {
  switch (template) {
    case 'grid': {
      return <GridList {...props} />
    }
    default: {
      return <GridList {...props} />
    }
  }
}
