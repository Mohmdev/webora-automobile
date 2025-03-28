'use client'

import { cn } from '@/lib/utils'
import type { ListProps } from '@/types'
import { use } from 'react'
import { Record } from '../record'

export function GridList1({ classifieds, favourites, className }: ListProps) {
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
