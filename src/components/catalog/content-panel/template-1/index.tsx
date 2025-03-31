import { ListRecords } from '@/components/catalog/list'
import { CustomPagination } from '@/components/shared/custom-pagination'
import { CLASSIFIEDS_PER_PAGE } from '@/config/constants'
import { routes } from '@/config/routes'
import { getResultsCount } from '@/data/catalog'
import { cn } from '@/lib/utils'
import type { FavouritesProps, ParamsAwaitedProps } from '@/types'
import { useQuery } from '@tanstack/react-query'
import { FiltersDialog } from './filters-dialog'

export function ContentPanel1({
  favouriteIds,
  className,
  searchParams,
}: ParamsAwaitedProps & FavouritesProps & { className?: string }) {
  const { data: resultsCount } = useQuery({
    queryKey: ['resultsCount', searchParams],
    queryFn: () => getResultsCount(searchParams),
  })

  const totalPages = resultsCount
    ? Math.ceil(resultsCount / CLASSIFIEDS_PER_PAGE)
    : 0

  return (
    <div className={cn('flex-1 p-4', className)}>
      <div className="-mt-1 flex items-center justify-between space-y-2 pb-4">
        <div className="flex w-full items-center justify-between">
          <h2 className="min-w-fit font-semibold text-sm md:text-base lg:text-xl">
            We have found {resultsCount} classifieds
          </h2>
          {/* Mobile filters dialog */}
          <FiltersDialog searchParams={searchParams} className="lg:hidden" />
        </div>
        <CustomPagination
          baseURL={routes.catalog}
          totalPages={totalPages ?? 0}
          styles={{
            paginationRoot: 'justify-end hidden lg:flex',
            paginationPrevious: '',
            paginationNext: '',
            paginationLink: 'border-none active:border text-foreground',
            paginationLinkActive: '',
          }}
        />
      </div>

      <ListRecords
        template="grid-1"
        favouriteIds={favouriteIds}
        searchParams={searchParams}
      />

      <CustomPagination
        baseURL={routes.catalog}
        totalPages={totalPages ?? 0}
        styles={{
          paginationRoot: 'justify-center lg:hidden pt-12',
          paginationPrevious: '',
          paginationNext: '',
          paginationLink: 'border-none active:border',
          paginationLinkActive: '',
        }}
      />
    </div>
  )
}
