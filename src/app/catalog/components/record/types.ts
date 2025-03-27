import type { ClassifiedWithImages } from '@/config/types'
import type React from 'react'

export interface Template {
  template?: 'card-1' | 'card-2' | 'skeleton'
}

export type RecordProps = {
  classified: ClassifiedWithImages
  favourites: number[]
  className?: string
}

export type ClassifiedInfoItem = {
  id: string
  icon: React.ReactNode
  value: string | null
}
