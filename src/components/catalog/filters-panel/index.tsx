import type { ParamsAwaitedProps, UserProps } from '@/types'
import { FiltersPanel1 } from './template-1'
import { FiltersPanel2 } from './template-2'

interface Template {
  template?: 'template-1' | 'template-2'
}

export function FiltersPanel({
  template,
  searchParams,
  user,
}: Template & ParamsAwaitedProps & UserProps) {
  const panel1Props = {
    searchParams,
  }

  const panel2Props = {
    searchParams,
    user,
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
