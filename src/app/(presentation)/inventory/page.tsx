import { getInventory } from '@/app/catalog/data'
import { Catalog } from '@/components/catalog'
import { CLASSIFIEDS_PER_PAGE } from '@/config/constants'
import { prisma } from '@/lib/prisma'
import { redis } from '@/lib/redis-store'
import { getSourceId } from '@/lib/source-id'
import { buildClassifiedFilterQuery } from '@/lib/utils'
import type { FavouritesProps, PageProps } from '@/types'
import { ClassifiedStatus } from '@prisma/client'

export default async function InventoryPage(props: PageProps) {
  const searchParams = await props.searchParams
  const classifieds = getInventory(searchParams)
  const sourceId = await getSourceId()
  const getFavourites = await redis.get<FavouritesProps>(sourceId ?? '')
  const resultCount = await prisma.classified.count({
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

  const totalPages = resultCount
    ? Math.ceil(resultCount / CLASSIFIEDS_PER_PAGE)
    : 0

  return (
    <Catalog
      template="catalog-1"
      classifiedsArray={classifieds}
      favouriteIds={getFavourites?.favouriteIds ?? []}
      minMaxValues={minMaxResult}
      searchParams={searchParams}
      resultCount={resultCount}
      totalPages={totalPages}
    />
  )
}
