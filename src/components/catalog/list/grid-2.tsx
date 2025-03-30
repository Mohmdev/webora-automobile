'use client'

import { cn } from '@/lib/utils'
import type { FavouritesProps, RecordsPromiseProps } from '@/types'
import { use } from 'react'
import { Record } from '../record'

export function GridList2({
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
        'grid grid-cols-1 gap-4 lg:grid-cols-2 2xl:grid-cols-3',
        className
      )}
    >
      {classifieds.map((classified) => {
        return (
          <Record
            key={classified.id}
            template="card-2"
            record={classified}
            favouriteIds={favouriteIds}
          />
        )
      })}
    </div>
  )
}
