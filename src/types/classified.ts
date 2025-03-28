import type { UpdateClassifiedType } from '@/app/schemas/classified.schema'
import type { Classified, Prisma } from '@prisma/client'

export type ClassifiedWithImages = Prisma.ClassifiedGetPayload<{
  include: {
    images: true
  }
}>

export interface Favourites {
  ids: number[]
}

export type FilterOptions<LType, VType> = Array<{
  label: LType
  value: VType
}>

export type ClassifiedImages = UpdateClassifiedType['images']

export type ClassifiedKeys = keyof Pick<
  Classified,
  | 'status'
  | 'title'
  | 'vrm'
  | 'id'
  | 'views'
  | 'year'
  | 'colour'
  | 'price'
  | 'createdAt'
>
