import type { QueryReturnMetaProps } from '@/data/catalog'
import type { ParamsAwaitedProps, UserProps } from '@/types'
import { FiltersPanel1 } from './template-1'
import { FiltersPanel2 } from './template-2'

interface Template {
  template?: 'template-1' | 'template-2'
}

export function FiltersPanel({
  template,
  minMaxValues,
  searchParams,
  recordsWithPrice,
  user,
}: Template & ParamsAwaitedProps & UserProps & QueryReturnMetaProps) {
  const panel1Props = {
    minMaxValues,
    searchParams,
  }

  const panel2Props = {
    minMaxValues,
    searchParams,
    user,
    recordsWithPrice,
  }

  switch (template) {
    case 'template-1': {
      return <FiltersPanel1 {...panel1Props} />
    }
    case 'template-2': {
      return <FiltersPanel2 {...panel2Props} />
    }
    default: {
      return <FiltersPanel2 {...panel2Props} />
    }
  }
}
