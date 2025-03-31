import { ClearFilters } from '@/components/filters/clear-filters'
import type { ParamsAwaitedProps } from '@/types'

export function PanelHeader({ searchParams }: ParamsAwaitedProps) {
  return (
    <div className="flex justify-between px-4 font-semibold text-lg">
      <span>Filters</span>
      <div className="flex justify-between">
        <ClearFilters searchParams={searchParams} look="nonpersistent" />
      </div>
    </div>
  )
}
