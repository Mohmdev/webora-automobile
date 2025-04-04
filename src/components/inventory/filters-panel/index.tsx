import type { ResolvedParams } from '@/types'
import { FiltersPanel1 } from './template-1'
import { FiltersPanel2 } from './template-2'

interface Template {
  template?: 'template-1' | 'template-2'
}

export function FiltersPanel({
  template,
  searchParams,
  className,
}: Template & ResolvedParams & { className?: string }) {
  const props = { searchParams, className }

  switch (template) {
    case 'template-1': {
      return <FiltersPanel1 {...props} />
    }
    case 'template-2': {
      return <FiltersPanel2 {...props} />
    }
    default: {
      return <FiltersPanel2 {...props} />
    }
  }
}
