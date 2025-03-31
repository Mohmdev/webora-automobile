import { getMinMaxValues, getRecords, getResultsCount } from '@/_data/catalog'
import { Catalog } from '@/components/catalog'
import { sampleData } from '@/data/catalog/sampleData'
import { redis } from '@/lib/redis-store'
import { getSourceId } from '@/lib/source-id'
import type { FavouritesProps, ParamsPromisedProps } from '@/types'

export default async function CatalogPage(props: ParamsPromisedProps) {
  const searchParams = await props.searchParams
  const classifieds = getRecords(searchParams)
  const resultsCount = await getResultsCount(searchParams)
  const minMaxResult = await getMinMaxValues()

  const resolvedClassifieds = await classifieds
  const recordsWithPrice = resolvedClassifieds.map((classified) => ({
    price: classified.price,
  }))

  const sourceId = await getSourceId()

  const favourites = await redis.get<FavouritesProps>(sourceId ?? '')
  const favouriteIds = Array.isArray(favourites?.favouriteIds)
    ? favourites.favouriteIds
    : []

  const sampleUser = sampleData.user

  return (
    <Catalog
      template="catalog-2"
      records={classifieds}
      favouriteIds={favouriteIds}
      minMaxValues={minMaxResult}
      searchParams={searchParams}
      resultsCount={resultsCount}
      user={sampleUser}
      recordsWithPrice={recordsWithPrice}
    />
  )
}
