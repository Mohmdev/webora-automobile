import type { ResolvedParams } from '@/types'
import { Inventory1 } from './templates/inventory-1'
import { Inventory2 } from './templates/inventory-2'

interface Template {
  template?: 'inventory-1' | 'inventory-2'
}

export function Inventory({
  template,
  searchParams,
  className,
}: Template & ResolvedParams & { className?: string }) {
  const props = {
    searchParams,
    className,
  }

  switch (template) {
    case 'inventory-1': {
      return <Inventory1 {...props} />
    }
    case 'inventory-2': {
      return <Inventory2 {...props} />
    }
    default: {
      return <Inventory2 {...props} />
    }
  }
}
