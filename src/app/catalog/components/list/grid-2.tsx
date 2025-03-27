'use client'

import { cn } from '@/lib/utils'
import { use } from 'react'
import type { ListProps } from '.'
import { Record } from '../record'

export function GridList2(props: ListProps) {
  const { classifieds, favourites, className } = props
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
