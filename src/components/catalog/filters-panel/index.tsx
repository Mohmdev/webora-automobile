import type { ParamsAwaitedProps } from '@/types'
import { FiltersPanel1 } from './template-1'
import { FiltersPanel2 } from './template-2'

interface Template {
  template?: 'template-1' | 'template-2'
}

export function FiltersPanel({
  template,
  searchParams,
}: Template & ParamsAwaitedProps) {
  switch (template) {
    case 'template-1': {
      return <FiltersPanel1 searchParams={searchParams} />
    }
    case 'template-2': {
      return <FiltersPanel2 searchParams={searchParams} />
    }
    default: {
      return <FiltersPanel2 searchParams={searchParams} />
    }
  }
}
