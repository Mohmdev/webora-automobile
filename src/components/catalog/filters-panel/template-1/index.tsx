import { cn } from '@/lib/utils'
import type { ParamsAwaitedProps } from '@/types'
import { PanelBody } from './body'
import { PanelHeader } from './header'

export function FiltersPanel1({
  searchParams,
  className,
}: ParamsAwaitedProps & { className?: string }) {
  return (
    <div
      className={cn(
        'hidden w-[21.25rem] border-muted border-r py-4 lg:block',
        className
      )}
    >
      <PanelHeader searchParams={searchParams} />

      <PanelBody searchParams={searchParams} />
    </div>
  )
}
