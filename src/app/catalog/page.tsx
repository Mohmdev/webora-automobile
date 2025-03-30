import { Catalog } from '@/components/catalog'
import { ThemeProvider } from '@/components/theme-provider'
import { prisma } from '@/lib/prisma'
import { redis } from '@/lib/redis-store'
import { getSourceId } from '@/lib/source-id'
import type { FavouritesProps, ParamsPromisedProps } from '@/types'
import { ClassifiedStatus } from '@prisma/client'
import { getInventory, sampleData } from './data'

export default async function CatalogPage(props: ParamsPromisedProps) {
  const searchParams = await props.searchParams
  const classifieds = getInventory(searchParams)
  const sourceId = await getSourceId()
  const favourites = await redis.get<FavouritesProps>(sourceId ?? '')

  // Ensure favouriteIds is always an array
  const favouriteIds = Array.isArray(favourites?.favouriteIds)
    ? favourites.favouriteIds
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

  const sampleUser = sampleData.user

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <Catalog
        template="catalog-2"
        records={classifieds}
        favouriteIds={favouriteIds}
        minMaxValues={minMaxResult}
        searchParams={searchParams}
        user={sampleUser}
      />
    </ThemeProvider>
  )
}
