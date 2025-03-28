'use client'

import { cn } from '@/lib/utils'
import type { ClassifiedsArrayProps, FavouritesProps } from '@/types'
import { use } from 'react'
import { Record } from '../record'

export function GridList2({
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
        'grid grid-cols-1 gap-4 lg:grid-cols-2 2xl:grid-cols-3',
        className
      )}
    >
      {classifieds.map((classified) => {
        return (
          <Record
            key={classified.id}
            template="card-2"
            classified={classified}
            favouriteIds={favouriteIds}
          />
        )
      })}
    </div>
  )
}
