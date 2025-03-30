'use client'

import { cn } from '@/lib/utils'
import type { FavouritesProps, RecordsPromiseProps } from '@/types'
import { use } from 'react'
import { Record } from '../record'

export function GridList1({
  records,
  favouriteIds,
  className,
}: RecordsPromiseProps & FavouritesProps & { className?: string }) {
  if (!records) {
    return null
  }
  const classifieds = use(records)

  return (
    <div
      className={cn(
        'grid auto-rows-min grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
        className
      )}
    >
      {classifieds.map((classified) => {
        return (
          <Record
            key={classified.id}
            template="card-1"
            record={classified}
            favouriteIds={favouriteIds}
          />
        )
      })}
    </div>
  )
}
