'use client'

import type { ClassifiedsListProps } from '@/types'
import { use } from 'react'
import { ClassifiedCard } from './classified-card'

export const ClassifiedsList = (props: ClassifiedsListProps) => {
  const { classifieds, favourites } = props
  const inventory = use(classifieds)
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
      {inventory.map((classified) => {
        return (
          <ClassifiedCard
            key={classified.id}
            classified={classified}
            favourites={favourites}
          />
        )
      })}
    </div>
  )
}
