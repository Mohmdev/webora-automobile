'use client'

import { ListRecords } from '@/components/catalog/list'
import { DialogFilters } from '@/components/filters/dialog-filters'
import { CustomPagination } from '@/components/shared/custom-pagination'
import { routes } from '@/config/routes'
import { cn } from '@/lib/utils'
import type {
  ClassifiedsArrayProps,
  FavouritesProps,
  MinMaxProps,
  SearchAwaitedProps,
  SearchResultProps,
} from '@/types'
import { Suspense } from 'react'

export function ContentPanel1({
  classifiedsArray,
  favouriteIds,
  className,
  resultCount,
  minMaxValues,
  searchParams,
  totalPages,
}: SearchAwaitedProps &
  ClassifiedsArrayProps &
  FavouritesProps &
  MinMaxProps &
  SearchResultProps & { className?: string }) {
  if (!classifiedsArray) {
    return null
  }

  return (
    <div className={cn('flex-1 p-4', className)}>
      <div className="-mt-1 flex items-center justify-between space-y-2 pb-4">
        <div className="flex w-full items-center justify-between">
          <h2 className="min-w-fit font-semibold text-sm md:text-base lg:text-xl">
            We have found {resultCount} classifieds
          </h2>
          <DialogFilters
            minMaxValues={minMaxValues}
            count={resultCount ?? 0}
            searchParams={searchParams}
          />
        </div>
        <CustomPagination
          baseURL={routes.inventory}
          totalPages={totalPages ?? 0}
          styles={{
            paginationRoot: 'justify-end hidden lg:flex',
            paginationPrevious: '',
            paginationNext: '',
            paginationLink: 'border-none active:border text-foreground',
            paginationLinkActive: '',
          }}
        />
      </div>

      <Suspense fallback={<ListRecords template="skeleton-1" />}>
        <ListRecords
          template="grid-1"
          classifiedsArray={classifiedsArray}
          favouriteIds={favouriteIds}
        />
      </Suspense>

      <CustomPagination
        baseURL={routes.inventory}
        totalPages={totalPages ?? 0}
        styles={{
          paginationRoot: 'justify-center lg:hidden pt-12',
          paginationPrevious: '',
          paginationNext: '',
          paginationLink: 'border-none active:border',
          paginationLinkActive: '',
        }}
      />
    </div>
  )
}
