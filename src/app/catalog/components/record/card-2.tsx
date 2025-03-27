'use client'

import { routes } from '@/config/routes'
import { cn } from '@/lib/utils'
import { useRecordData, useRecordState } from './hooks'
import { CTA } from './shared'
import type { RecordProps } from './types'

export function Card2(props: RecordProps) {
  const { classified, favourites, className } = props
  const { isFavourite, setIsFavourite, isVisible } = useRecordState(
    classified,
    favourites
  )
  const { formattedPrice, classifiedInfo } = useRecordData(classified)

  // This is a placeholder component for a different card style template
  // Implement actual UI here when needed
  return (
    <div className={cn('rounded-xl bg-muted/50 p-4', className)}>
      <h3 className="font-semibold text-lg">{classified.title}</h3>
      <p className="text-gray-500 text-sm">Price: {formattedPrice}</p>
      <div className="mt-4 flex gap-2">
        <CTA
          label="View Details"
          isPrimary
          href={routes.singleClassified(classified.slug)}
        />
      </div>
    </div>
  )
}
