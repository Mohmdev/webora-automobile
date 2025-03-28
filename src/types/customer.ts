import type { Prisma } from '@prisma/client'

export type CustomerWithClassified = Prisma.CustomerGetPayload<{
  include: { classified: true }
}>

export type CustomerKeys = keyof Pick<
  Prisma.CustomerGetPayload<{ include: { classified: true } }>,
  | 'id'
  | 'email'
  | 'mobile'
  | 'firstName'
  | 'lastName'
  | 'updatedAt'
  | 'createdAt'
  | 'status'
  | 'bookingDate'
  | 'classified'
>
