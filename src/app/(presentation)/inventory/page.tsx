import { getInventory } from '@/app/catalog/data'
import { Catalog } from '@/components/catalog'
import { prisma } from '@/lib/prisma'
import { redis } from '@/lib/redis-store'
import { getSourceId } from '@/lib/source-id'
import type { FavouritesProps, PageProps } from '@/types'
import { ClassifiedStatus } from '@prisma/client'

export default async function InventoryPage(props: PageProps) {
  const searchParams = await props.searchParams
  const classifieds = getInventory(searchParams)
  const sourceId = await getSourceId()
  const getFavourites = await redis.get<FavouritesProps>(sourceId ?? '')

  // Ensure favouriteIds is always an array
  const favouriteIds = Array.isArray(getFavourites?.favouriteIds)
    ? getFavourites.favouriteIds
    : []

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

  return (
    <Catalog
      template="catalog-1"
      classifiedsArray={classifieds}
      favouriteIds={favouriteIds}
      minMaxValues={minMaxResult}
      searchParams={searchParams}
    />
  )
}
