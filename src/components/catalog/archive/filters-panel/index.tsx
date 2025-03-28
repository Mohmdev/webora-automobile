import type { FiltersPanelProps } from '@/types'
import { FiltersPanel1 } from './panel-1'
import { FiltersPanel2 } from './panel-2'

interface Template {
  template?: 'panel-1' | 'panel-2'
}

export function FiltersPanel({
  template,
  ...props
}: Template & FiltersPanelProps) {
  switch (template) {
    case 'panel-1': {
      return <FiltersPanel1 {...props} />
    }
    case 'panel-2': {
      return <FiltersPanel2 {...props} />
    }
    default: {
      return <FiltersPanel2 {...props} />
    }
  }
}
