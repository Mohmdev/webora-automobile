import type { Prisma } from '@prisma/client'
import type { ChangeEvent } from 'react'

export type ClassifiedData = Prisma.ClassifiedGetPayload<{
  include: {
    images: false
  }
}>

export type ClassifiedImages = Prisma.ClassifiedGetPayload<{
  select: {
    images: true
  }
}>

export type ClassifiedProps = {
  classified?: ClassifiedData & ClassifiedImages
}

export type ClassifiedsArrayProps = {
  classifiedsArray?: Promise<(ClassifiedData & ClassifiedImages)[]>
}

export type FavouriteIds = number[]

export type FavouritesProps = {
  favouriteIds?: FavouriteIds
}

export interface FavouriteButtonProps {
  setIsFavourite: (isFavourite: boolean) => void
  isFavourite: boolean
  id: number
}

export type UserProps = {
  user?: {
    name: string
    email: string
    avatar: string
  }
}

// Search and params

type Params = {
  [x: string]: string | string[]
}
export type PageProps = {
  params?: Promise<Params>
  searchParams?: Promise<{ [x: string]: string | string[] | undefined }>
}

export type SearchAwaitedProps = {
  params?: Awaited<PageProps['params']>
  searchParams?: Awaited<PageProps['searchParams']>
}

export type TaxonomyFiltersProps = SearchAwaitedProps & {
  handleChange: (e: ChangeEvent<HTMLSelectElement>) => void
}

export type SearchResultProps = {
  resultCount?: number
  totalPages?: number
}

export type MinMaxProps = {
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
}

export type PrevState = {
  success: boolean
  message: string
}

// Constructed props

export type RecordDataProps = ClassifiedProps & FavouritesProps
