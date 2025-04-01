import type { UpdateClassifiedType } from '@/schemas/classified.schema'
import type { Classified } from '@prisma/client'

export type FilterOptions<LType, VType> = Array<{
  label: LType
  value: VType
}>

export type UpdateClassifiedImages = UpdateClassifiedType['images']
export type UpdateClassifiedImage = UpdateClassifiedType['images'][number]

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
