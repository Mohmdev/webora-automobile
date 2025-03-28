import type { ClassifiedWithImages } from '@/types'

export interface ClassifiedCardProps {
  classified: ClassifiedWithImages
  favourites: number[]
}

export interface ClassifiedsListProps {
  classifieds: Promise<ClassifiedWithImages[]>
  favourites: number[]
}

export interface FavouriteButtonProps {
  setIsFavourite: (isFavourite: boolean) => void
  isFavourite: boolean
  id: number
}
