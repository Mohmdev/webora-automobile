import type { MinMaxProps, SearchAwaitedProps, UserProps } from '@/types'
import { FiltersPanel1 } from './panel-1'
import { FiltersPanel2 } from './panel-2'

interface Template {
  template?: 'panel-1' | 'panel-2'
}

export function FiltersPanel({
  template,
  minMaxValues,
  searchParams,
  user,
}: Template & SearchAwaitedProps & UserProps & MinMaxProps) {
  const panel1Props = {
    minMaxValues,
    searchParams,
  }

  const panel2Props = {
    minMaxValues,
    searchParams,
    user,
  }

  switch (template) {
    case 'panel-1': {
      return <FiltersPanel1 {...panel1Props} />
    }
    case 'panel-2': {
      return <FiltersPanel2 {...panel2Props} />
    }
    default: {
      return <FiltersPanel2 {...panel2Props} />
    }
  }
}
