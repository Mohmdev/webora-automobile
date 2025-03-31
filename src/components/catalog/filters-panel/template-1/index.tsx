import type { ParamsAwaitedProps } from '@/types'
import { PanelBody } from './body'
import { PanelHeader } from './header'

export function FiltersPanel1({ searchParams }: ParamsAwaitedProps) {
  return (
    <div className="hidden w-[21.25rem] border-muted border-r py-4 lg:block">
      <PanelHeader searchParams={searchParams} />

      <PanelBody searchParams={searchParams} />
    </div>
  )
}
