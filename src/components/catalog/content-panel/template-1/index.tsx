import { ListRecords } from '@/components/catalog/list'
import { CustomPagination } from '@/components/shared/custom-pagination'
import { CLASSIFIEDS_PER_PAGE } from '@/config/constants'
import { routes } from '@/config/routes'
import { prisma } from '@/lib/prisma'
import { buildClassifiedFilterQuery, cn } from '@/lib/utils'
import type {
  FavouritesProps,
  MinMaxProps,
  ParamsAwaitedProps,
  RecordsPromiseProps,
} from '@/types'
import { Suspense } from 'react'
import { FiltersDialog } from './filters-dialog'

export async function ContentPanel1({
  records,
  favouriteIds,
  className,
  minMaxValues,
  searchParams,
}: ParamsAwaitedProps &
  RecordsPromiseProps &
  FavouritesProps &
  MinMaxProps & { className?: string }) {
  if (!records) {
    return null
  }
  const resultCount = await prisma.classified.count({
    where: buildClassifiedFilterQuery(searchParams),
  })

  const totalPages = resultCount
    ? Math.ceil(resultCount / CLASSIFIEDS_PER_PAGE)
    : 0
  return (
    <div className={cn('flex-1 p-4', className)}>
      <div className="-mt-1 flex items-center justify-between space-y-2 pb-4">
        <div className="flex w-full items-center justify-between">
          <h2 className="min-w-fit font-semibold text-sm md:text-base lg:text-xl">
            We have found {resultCount} classifieds
          </h2>
          {/* Mobile filters dialog */}
          <FiltersDialog
            minMaxValues={minMaxValues}
            count={resultCount ?? 0}
            searchParams={searchParams}
            className="lg:hidden"
          />
        </div>
        <CustomPagination
          baseURL={routes.inventory}
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

      <Suspense fallback={<ListRecords template="skeleton-1" />}>
        <ListRecords
          template="grid-1"
          records={records}
          favouriteIds={favouriteIds}
        />
      </Suspense>

      <CustomPagination
        baseURL={routes.inventory}
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
