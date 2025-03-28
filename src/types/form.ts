import type { SearchAwaitedProps } from '@/types'
import type { Prisma } from '@prisma/client'

export type MultiStepFormComponentProps = SearchAwaitedProps & {
  classified: Prisma.ClassifiedGetPayload<{
    include: { make: true }
  }>
}

export const MultiStepFormEnum = {
  WELCOME: 1,
  SELECT_DATE: 2,
  SUBMIT_DETAILS: 3,
} as const

export type MultiStepFormType =
  (typeof MultiStepFormEnum)[keyof typeof MultiStepFormEnum]

export interface ProgressArgs {
  sent: number
  total: number
  uuid: string
  percentage: number
  key?: string
}
