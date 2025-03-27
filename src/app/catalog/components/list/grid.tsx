'use client'

import { cn } from '@/lib/utils'
import { use } from 'react'
import type { ListProps } from '.'
import { Record } from '../record'

export function GridList(props: ListProps) {
  const { classifieds, favourites, className } = props
  const inventory = use(classifieds)

  return (
    <div className={cn('grid auto-rows-min gap-4 md:grid-cols-5', className)}>
      {inventory.map((classified) => {
        return (
          <Record
            key={classified.id}
            template="card-1"
            classified={classified}
            favourites={favourites}
          />
        )
      })}
    </div>
  )
}
