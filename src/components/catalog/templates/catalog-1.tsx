import { FiltersPanel } from '@/components/catalog/filters-panel'
import { cn } from '@/lib/utils'
import type { ResolvedParams } from '@/types'
import { ContentPanel } from '../content-panel'

export function Catalog1({
  searchParams,
  className,
}: ResolvedParams & { className?: string }) {
  return (
    <div className={cn('flex', className)}>
      <FiltersPanel template="template-1" searchParams={searchParams} />

      <ContentPanel template="template-1" searchParams={searchParams} />
    </div>
  )
}
