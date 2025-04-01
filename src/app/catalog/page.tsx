import {
  fetchMinMaxValues,
  fetchRecords,
  fetchRecordsWithPriceSelect,
  fetchResultsCount,
  fetchTaxonomiesData,
  fetchUserData,
} from '@/_data'
import { Catalog } from '@/components/catalog'
import { redis } from '@/lib/redis-store'
import { getSourceId } from '@/lib/source-id'
import { getQueryClient } from '@/providers/react-query/get-query-client'
import type { FavouritesProps, ParamsPromisedProps } from '@/types'
import { HydrationBoundary, dehydrate } from '@tanstack/react-query'

export default async function CatalogPage(props: ParamsPromisedProps) {
  const queryClient = getQueryClient()

  const searchParams = await props.searchParams

  const sourceId = await getSourceId()

  const favourites = await redis.get<FavouritesProps>(sourceId ?? '')
  const favouriteIds = Array.isArray(favourites?.favouriteIds)
    ? favourites.favouriteIds
    : []

  await queryClient.prefetchQuery({
    queryKey: ['taxonomy', undefined, undefined],
    queryFn: fetchTaxonomiesData,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
  await queryClient.prefetchQuery({
    queryKey: ['userData'],
    queryFn: fetchUserData,
  })
  await queryClient.prefetchQuery({
    queryKey: ['minMaxValues'],
    queryFn: fetchMinMaxValues,
  })
  await queryClient.prefetchQuery({
    queryKey: ['records', searchParams],
    queryFn: () => fetchRecords(searchParams),
  })
  await queryClient.prefetchQuery({
    queryKey: ['recordsWithPrice', searchParams],
    queryFn: () => fetchRecordsWithPriceSelect(searchParams),
  })
  await queryClient.prefetchQuery({
    queryKey: ['resultsCount', searchParams],
    queryFn: () => fetchResultsCount(searchParams),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Catalog
        template="catalog-2"
        favouriteIds={favouriteIds}
        searchParams={searchParams}
      />
    </HydrationBoundary>
  )
}
