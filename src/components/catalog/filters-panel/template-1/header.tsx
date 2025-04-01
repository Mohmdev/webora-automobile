import { ClearFilters } from '@/components/filters/clear-filters'
import { cn } from '@/lib/utils'
import type { ParamsAwaitedProps } from '@/types'

export function PanelHeader({
  searchParams,
  className,
}: ParamsAwaitedProps & { className?: string }) {
  return (
    <div
      className={cn(
        'flex justify-between px-4 font-semibold text-lg',
        className
      )}
    >
      <span>Filters</span>
      <div className="flex justify-between">
        <ClearFilters searchParams={searchParams} look="nonpersistent" />
      </div>
    </div>
  )
}
