import type { MinMaxProps, SearchAwaitedProps } from '@/types'
import { PanelBody } from './body'
import { PanelHeader } from './header'

export function FiltersPanel1(props: MinMaxProps & SearchAwaitedProps) {
  return (
    <div className="hidden w-[21.25rem] border-muted border-r py-4 lg:block">
      <PanelHeader
        searchParams={props.searchParams as Record<string, string>}
      />

      <PanelBody {...props} />
    </div>
  )
}
