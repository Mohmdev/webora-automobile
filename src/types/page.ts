import type { Prisma } from '@prisma/client'
import type { ChangeEvent } from 'react'

type Params = {
  [x: string]: string | string[]
}

export type PrevState = {
  success: boolean
  message: string
}

export type PageProps = {
  params?: Promise<Params>
  searchParams?: Promise<{ [x: string]: string | string[] | undefined }>
}

export type AwaitedPageProps = {
  params?: Awaited<PageProps['params']>
  searchParams?: Awaited<PageProps['searchParams']>
}

export interface TaxonomyFiltersProps extends AwaitedPageProps {
  handleChange: (e: ChangeEvent<HTMLSelectElement>) => void
}

export interface SidebarProps extends AwaitedPageProps {
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
