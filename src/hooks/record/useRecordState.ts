import { routes } from '@/config/routes'
import type { ClassifiedWithImages } from '@/types'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export function useRecordState(
  classified: ClassifiedWithImages,
  favourites: number[]
) {
  const pathname = usePathname()
  const [isFavourite, setIsFavourite] = useState(
    favourites.includes(classified.id)
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
