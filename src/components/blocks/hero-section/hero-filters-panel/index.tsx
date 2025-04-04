import { TaxonomySelectFiltersStack } from '@/components/filters/_stack'
import { PriceRangeSelect, YearRangeSelect } from '@/components/filters/range'
import { SearchButton } from '@/components/shared/search-button'
import { Button } from '@/components/ui/button'
import { routes } from '@/config/routes'
import { cn } from '@/lib/utils'
import type { ResolvedParams } from '@/types'
import Link from 'next/link'

export function HeroFiltersPanel({
  searchParams,
  className,
}: ResolvedParams & { className?: string }) {
  const totalFiltersApplied = Object.keys(searchParams || {}).length
  const isFilterApplied = totalFiltersApplied > 0

  return (
    <div
      className={cn(
        'mx-auto w-full max-w-md rounded-md bg-background/10 p-6 shadow-lg backdrop-blur-xl',
        className
      )}
    >
      <div className="space-y-4">
        <div className="flex w-full flex-col gap-x-4 space-y-2 text-white">
          <TaxonomySelectFiltersStack searchParams={searchParams} />
          <YearRangeSelect searchParams={searchParams} />
          <PriceRangeSelect searchParams={searchParams} />
        </div>
        <SearchButton searchParams={searchParams} />
        {isFilterApplied && (
          <Button
            asChild
            variant="outline"
            className="w-full hover:bg-slate-200"
          >
            <Link href={routes.home}>
              Clear Filters ({totalFiltersApplied})
            </Link>
          </Button>
        )}
      </div>
    </div>
  )
}
