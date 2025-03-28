import type { ArchiveProps } from '@/types'
import { ContentPanel1 } from './panel-1'
import { ContentPanel2 } from './panel-2'

interface Template {
  template?: 'panel-1' | 'panel-2'
}

export function ContentPanel({ template, ...props }: Template & ArchiveProps) {
  switch (template) {
    case 'panel-1': {
      return <ContentPanel1 {...props} />
    }
    case 'panel-2': {
      return <ContentPanel2 {...props} />
    }
    default: {
      return <ContentPanel1 {...props} />
    }
  }
}
