import type { MinMaxProps, SearchAwaitedProps } from '@/types'
import { FiltersPanelClientWrapper } from './client'

export function FiltersPanel1(props: MinMaxProps & SearchAwaitedProps) {
  return <FiltersPanelClientWrapper {...props} />
}
