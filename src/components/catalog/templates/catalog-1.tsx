import { FiltersPanel } from '@/components/catalog/filters-panel'
import { cn } from '@/lib/utils'
import type { ParamsAwaitedProps } from '@/types'
import { ContentPanel } from '../content-panel'

export function Catalog1({
  searchParams,
  className,
}: ParamsAwaitedProps & { className?: string }) {
  return (
    <div className={cn('flex', className)}>
      <FiltersPanel template="template-1" searchParams={searchParams} />

      <ContentPanel template="template-1" searchParams={searchParams} />
    </div>
  )
}
