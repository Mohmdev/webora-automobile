import {
  fetchFavourites,
  fetchMinMaxValues,
  fetchRecords,
  fetchRecordsCount,
  fetchRecordsWithPriceSelect,
  fetchTaxonomiesDataFromRedis,
  fetchUserData,
} from '@/_data'
import { Catalog } from '@/components/catalog'
import { getQueryClient } from '@/providers/react-query/get-query-client'
import type { PromisedParams } from '@/types'
import { HydrationBoundary, dehydrate } from '@tanstack/react-query'

export default async function CatalogPage(props: PromisedParams) {
  const searchParams = await props.searchParams
  const queryClient = getQueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['taxonomy', undefined, undefined],
    queryFn: fetchTaxonomiesDataFromRedis,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
  await queryClient.prefetchQuery({
    queryKey: ['records', searchParams],
    queryFn: () => fetchRecords(searchParams),
  })
  await queryClient.prefetchQuery({
    queryKey: ['favourites'],
    queryFn: fetchFavourites,
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
    queryKey: ['recordsWithPrice', searchParams],
    queryFn: () => fetchRecordsWithPriceSelect(searchParams),
  })
  await queryClient.prefetchQuery({
    queryKey: ['recordsCount', searchParams],
    queryFn: () => fetchRecordsCount(searchParams),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Catalog template="catalog-2" searchParams={searchParams} />
    </HydrationBoundary>
  )
}
