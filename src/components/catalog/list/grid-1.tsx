'use client'

import { cn } from '@/lib/utils'
import type { ClassifiedsArrayProps, FavouritesProps } from '@/types'
import { use } from 'react'
import { Record } from '../record'

export function GridList1({
  classifiedsArray,
  favouriteIds,
  className,
}: ClassifiedsArrayProps & FavouritesProps & { className?: string }) {
  if (!classifiedsArray) {
    return null
  }
  const classifieds = use(classifiedsArray)

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
            classified={classified}
            favouriteIds={favouriteIds}
          />
        )
      })}
    </div>
  )
}
