import { routes } from '@/config/routes'
import type { ClassifiedData, FavouriteIds } from '@/types'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export function useRecordState(
  classified: ClassifiedData | undefined,
  favouriteIds: FavouriteIds = []
) {
  const pathname = usePathname()
  const [isFavourite, setIsFavourite] = useState(
    classified && Array.isArray(favouriteIds)
      ? favouriteIds.includes(classified.id)
      : false
  )
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    if (!isFavourite && pathname === routes.favourites) {
      setIsVisible(false)
    }
  }, [isFavourite, pathname])

  return {
    isFavourite,
    setIsFavourite,
    isVisible,
  }
}
