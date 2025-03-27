import { Card1 } from './card-1'

interface Template {
  template?: 'card-1' | 'card-2'
}

export interface RecordProps {
  key?: number
  className?: string
}

export function Record({ template, ...props }: Template & RecordProps) {
  switch (template) {
    case 'card-1': {
      return <Card1 {...props} />
    }
    default: {
      return <Card1 {...props} />
    }
  }
}
