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

export type RecordDataProps = {
  record?: ClassifiedData & ClassifiedImages
}

export type RecordsPromiseProps = {
  records?: Promise<(ClassifiedData & ClassifiedImages)[]>
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
export type PromisedParams = {
  params?: Promise<Params>
  searchParams?: Promise<{ [x: string]: string | string[] | undefined }>
}

export type ResolvedParams = {
  params?: Awaited<PromisedParams['params']>
  searchParams?: Awaited<PromisedParams['searchParams']>
}

export type TaxonomyFiltersProps = ResolvedParams & {
  handleChange: (e: ChangeEvent<HTMLSelectElement>) => void
}

export type MinMaxProps = {
  minMaxValues:
    | Prisma.GetClassifiedAggregateType<{
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
    | undefined
    | null
}

export type PrevState = {
  success: boolean
  message: string
}
