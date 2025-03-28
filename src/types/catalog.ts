import type { AwaitedPageProps, ClassifiedWithImages } from '@/types'
import type { Prisma } from '@prisma/client'

export type RecordProps = {
  classified: ClassifiedWithImages
  favourites: number[]
  className?: string
}

export type ListProps = {
  classifieds: Promise<ClassifiedWithImages[]>
  favourites: number[]
  className?: string
}

export type ArchiveProps = {
  classifieds: Promise<ClassifiedWithImages[]>
  favourites: number[]
  user?: {
    name: string
    email: string
    avatar: string
  }
}

export type FiltersPanelProps = AwaitedPageProps & {
  minMaxValues: Prisma.GetClassifiedAggregateType<{
    _min: {
      year: true
      price: true
      odoReading: true
    }
    _max: {
      year: true
      odoReading: true
      price: true
    }
  }>
  user?: {
    name: string
    email: string
    avatar: string
  }
}
