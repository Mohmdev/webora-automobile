'use client'

import { fetchFavourites, fetchRecords } from '@/_data'
import { cn } from '@/lib/utils'
import type { ParamsAwaitedProps } from '@/types'
import { useQuery } from '@tanstack/react-query'
import { SearchX } from 'lucide-react'
import { Record } from '../record'

export function GridList2({
  searchParams,
  isFavouritesList = false,
  className,
}: ParamsAwaitedProps & {
  isFavouritesList?: boolean
  className?: string
}) {
  const { data: favouriteIds = [], isLoading: isFavouritesLoading } = useQuery({
    queryKey: ['favourites'],
    queryFn: fetchFavourites,
  })

  const {
    data: records,
    isLoading: isRecordsLoading,
    isFetching,
  } = useQuery({
    queryKey: ['records', searchParams],
    queryFn: () => {
      if (isFavouritesList) {
        if (!favouriteIds || favouriteIds.length === 0) {
          return []
        }
        return fetchRecords(searchParams, { favouriteIds })
      }
      return fetchRecords(searchParams)
    },
    enabled: !isFavouritesList || !isFavouritesLoading,
  })

  const notReady =
    isRecordsLoading || isFetching || (isFavouritesList && isFavouritesLoading)
  if (notReady) {
    return (
      <div
        className={cn(
          'grid auto-rows-min grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
          className
        )}
      >
        {Array.from({ length: 12 }).map((_, index) => {
          return <Record key={index} template="skeleton-2" />
        })}
      </div>
    )
  }

  if (!records || records.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="mb-4 rounded-full bg-gray-100 p-3">
          <SearchX className="h-6 w-6 text-gray-500" />
        </div>
        <h3 className="mb-1 font-semibold text-lg">No vehicles found</h3>
        <p className="text-gray-500 text-sm">
          {isFavouritesList
            ? "You haven't added any vehicles to your favorites yet."
            : "Try adjusting your search filters to find what you're looking for."}
        </p>
      </div>
    )
  }

  return (
    <div
      className={cn(
        'grid grid-cols-1 gap-4 lg:grid-cols-2 2xl:grid-cols-3',
        className
      )}
    >
      {records.map((record) => {
        return (
          <Record
            key={record.id}
            template="card-2"
            record={record}
            favouriteIds={favouriteIds}
          />
        )
      })}
    </div>
  )
}
