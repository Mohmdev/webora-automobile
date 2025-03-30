import { cn } from '@/lib/utils'
import type { ParamsAwaitedProps } from '@/types'
import { MakeFilter } from './make-filter'
import { ModelFilter } from './model-filter'
import { ModelVariantFilter } from './model-variant-filter'

function TaxonomyFiltersBlock({
  searchParams,
  className,
}: ParamsAwaitedProps & { className?: string }) {
  return (
    <div className={cn('space-y-2', className)}>
      <MakeFilter searchParams={searchParams} />

      <ModelFilter searchParams={searchParams} />

      <ModelVariantFilter searchParams={searchParams} />
    </div>
  )
}

export { MakeFilter } from './make-filter'
export { ModelFilter } from './model-filter'
export { ModelVariantFilter } from './model-variant-filter'
export { TaxonomyFiltersBlock }
