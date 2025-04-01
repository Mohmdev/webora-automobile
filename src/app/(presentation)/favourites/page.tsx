import { fetchFavourites, fetchRecords, fetchRecordsCount } from '@/_data'
import { ListRecords } from '@/components/catalog/list'
import { CustomPagination } from '@/components/shared/custom-pagination'
import { routes } from '@/config/routes'
import { getQueryClient } from '@/providers/react-query/get-query-client'
import type { ParamsPromisedProps } from '@/types'
import { HydrationBoundary, dehydrate } from '@tanstack/react-query'

export default async function FavouritesPage(props: ParamsPromisedProps) {
  const searchParams = await props.searchParams
  const queryClient = getQueryClient()

  // Prefetch the favorites first
  await queryClient.prefetchQuery({
    queryKey: ['favourites'],
    queryFn: fetchFavourites,
  })

  // Get the favorites for prefetching the records
  const favouriteIds = await fetchFavourites()

  // Prefetch records count with same query key structure as used elsewhere
  await queryClient.prefetchQuery({
    queryKey: ['recordsCount', searchParams],
    queryFn: () => fetchRecordsCount(searchParams, { favouriteIds }),
  })

  // Prefetch the records using the same query key structure as catalog page
  await queryClient.prefetchQuery({
    queryKey: ['records', searchParams],
    queryFn: () => fetchRecords(searchParams, { favouriteIds }),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="container mx-auto min-h-[80dvh] px-4 py-8">
        <h1 className="mb-6 font-bold text-3xl">Your Favourite Vehicles</h1>
        <ListRecords
          searchParams={searchParams}
          isFavouritesList={true}
          template="grid-2"
        />
        <div className="mt-8 flex">
          <CustomPagination
            baseURL={routes.favourites}
            searchParams={searchParams}
            isFavouritesList={true}
            styles={{
              paginationRoot: 'justify-center',
              paginationPrevious: '',
              paginationNext: '',
              paginationLinkActive: '',
              paginationLink: 'border-none active:border',
            }}
          />
        </div>
      </div>
    </HydrationBoundary>
  )
}
