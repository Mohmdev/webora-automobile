import { cn } from '@/lib/utils'
import type { ResolvedParams } from '@/types'
import { TaxonomyMakeSelect } from '../select/taxonomy-make'
import { TaxonomyModelSelect } from '../select/taxonomy-model'
import { TaxonomyModelVariantSelect } from '../select/taxonomy-model-variant'

export function TaxonomySelectFiltersStack({
  searchParams,
  className,
}: ResolvedParams & { className?: string }) {
  return (
    <div className={cn('space-y-2', className)}>
      <TaxonomyMakeSelect searchParams={searchParams} />

      <TaxonomyModelSelect searchParams={searchParams} />

      <TaxonomyModelVariantSelect searchParams={searchParams} />
    </div>
  )
}
