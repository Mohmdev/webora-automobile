import { PageSchema } from '@/app/schemas/page.schema'
import { FiltersPanel } from '@/components/catalog/archive/filters-panel'
import { DialogFilters } from '@/components/filters/dialog-filters'
import { ClassifiedsList } from '@/components/inventory/classifieds-list'
import { InventorySkeleton } from '@/components/inventory/inventory-skeleton'
import { CustomPagination } from '@/components/shared/custom-pagination'
import { CLASSIFIEDS_PER_PAGE } from '@/config/constants'
import { routes } from '@/config/routes'
import { prisma } from '@/lib/prisma'
import { redis } from '@/lib/redis-store'
import { getSourceId } from '@/lib/source-id'
import { buildClassifiedFilterQuery } from '@/lib/utils'
import type { AwaitedPageProps, Favourites, PageProps } from '@/types'
import { ClassifiedStatus } from '@prisma/client'
import { Suspense } from 'react'

const getInventory = (searchParams: AwaitedPageProps['searchParams']) => {
  const validPage = PageSchema.parse(searchParams?.page)

  // get the current page
  const page = validPage ? validPage : 1

  // calculate the offset
  const offset = (page - 1) * CLASSIFIEDS_PER_PAGE

  return prisma.classified.findMany({
    where: buildClassifiedFilterQuery(searchParams),
    include: { images: { take: 1 } },
    skip: offset,
    take: CLASSIFIEDS_PER_PAGE,
  })
}

export default async function InventoryPage(props: PageProps) {
  const searchParams = await props.searchParams
  const classifieds = getInventory(searchParams)
  const count = await prisma.classified.count({
    where: buildClassifiedFilterQuery(searchParams),
  })

  const minMaxResult = await prisma.classified.aggregate({
    where: { status: ClassifiedStatus.LIVE },
    _min: {
      year: true,
      price: true,
      odoReading: true,
    },
    _max: {
      price: true,
      year: true,
      odoReading: true,
    },
  })

  const sourceId = await getSourceId()
  const favourites = await redis.get<Favourites>(sourceId ?? '')
  const totalPages = Math.ceil(count / CLASSIFIEDS_PER_PAGE)

  return (
    <div className="flex">
      <FiltersPanel
        template="panel-1"
        minMaxValues={minMaxResult}
        searchParams={searchParams}
      />

      <div className="flex-1 p-4">
        <div className="-mt-1 flex items-center justify-between space-y-2 pb-4">
          <div className="flex w-full items-center justify-between">
            <h2 className="min-w-fit font-semibold text-sm md:text-base lg:text-xl">
              We have found {count} classifieds
            </h2>
            <DialogFilters
              minMaxValues={minMaxResult}
              count={count}
              searchParams={searchParams}
            />
          </div>
          <CustomPagination
            baseURL={routes.inventory}
            totalPages={totalPages}
            styles={{
              paginationRoot: 'justify-end hidden lg:flex',
              paginationPrevious: '',
              paginationNext: '',
              paginationLink: 'border-none active:border text-foreground',
              paginationLinkActive: '',
            }}
          />
        </div>

        <Suspense fallback={<InventorySkeleton />}>
          <ClassifiedsList
            classifieds={classifieds}
            favourites={favourites ? favourites.ids : []}
          />
        </Suspense>

        <CustomPagination
          baseURL={routes.inventory}
          totalPages={totalPages}
          styles={{
            paginationRoot: 'justify-center lg:hidden pt-12',
            paginationPrevious: '',
            paginationNext: '',
            paginationLink: 'border-none active:border',
            paginationLinkActive: '',
          }}
        />
      </div>
    </div>
  )
}
