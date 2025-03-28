'use client'

import { cn } from '@/lib/utils'
import type { ListProps } from '@/types'
import { use } from 'react'
import { Record } from '../record'

export function GridList2({ classifieds, favourites, className }: ListProps) {
  const inventory = use(classifieds)

  return (
    <div
      className={cn(
        'grid grid-cols-1 gap-4 lg:grid-cols-2 2xl:grid-cols-3',
        className
      )}
    >
      {inventory.map((classified) => {
        return (
          <Record
            key={classified.id}
            template="card-2"
            classified={classified}
            favourites={favourites}
          />
        )
      })}
    </div>
  )
}
