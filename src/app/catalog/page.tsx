import { Catalog } from '@/components/catalog'
import { getMinMaxValues, getRecords, getResultsCount } from '@/data/catalog'
import { sampleData } from '@/data/catalog/sampleData'
import { redis } from '@/lib/redis-store'
import { getSourceId } from '@/lib/source-id'
import { getQueryClient } from '@/providers/react-query/get-query-client'
import type { FavouritesProps, ParamsPromisedProps } from '@/types'
import { HydrationBoundary, dehydrate } from '@tanstack/react-query'

export default async function CatalogPage(props: ParamsPromisedProps) {
  const queryClient = getQueryClient()

  const searchParams = await props.searchParams
  // const classifieds = getRecords(searchParams)
  const resultsCount = await getResultsCount(searchParams)

  // const resolvedClassifieds = await classifieds
  // const recordsWithPrice = resolvedClassifieds.map((classified) => ({
  //   price: classified.price,
  // }))

  const sourceId = await getSourceId()

  const favourites = await redis.get<FavouritesProps>(sourceId ?? '')
  const favouriteIds = Array.isArray(favourites?.favouriteIds)
    ? favourites.favouriteIds
    : []

  const sampleUser = sampleData.user

  //
  //
  await queryClient.prefetchQuery({
    queryKey: ['minMaxValues'],
    queryFn: getMinMaxValues,
  })
  await queryClient.prefetchQuery({
    queryKey: ['records', searchParams],
    queryFn: () => getRecords(searchParams),
  })

  //
  //

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Catalog
        template="catalog-2"
        favouriteIds={favouriteIds}
        searchParams={searchParams}
        resultsCount={resultsCount}
        user={sampleUser}
      />
    </HydrationBoundary>
  )
}
