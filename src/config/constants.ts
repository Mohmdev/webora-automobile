import type { BadgeProps } from '@/components/ui/badge'
import { ClassifiedStatus, CustomerStatus } from '@prisma/client'
import { createPngDataUri } from 'unlazy/blurhash'
import { routes } from './routes'

export const imageSources = {
  gClass0: 'https://webora-s3.imgix.net/uploads/protected/g-class-0.jpg',
  gClass1: 'https://webora-s3.imgix.net/uploads/protected/g-class-1.jpg',
  gClass2: 'https://webora-s3.imgix.net/uploads/protected/g-class-2.jpg',
  gClass3: 'https://webora-s3.imgix.net/uploads/protected/g-class-3.jpg',
  gClass4: 'https://webora-s3.imgix.net/uploads/protected/g-class-4.jpg',
  gClass5: 'https://webora-s3.imgix.net/uploads/protected/g-class-5.jpg',
  gClass6: 'https://webora-s3.imgix.net/uploads/protected/g-class-6.jpg',
  gClass7: 'https://webora-s3.imgix.net/uploads/protected/g-class-7.jpg',
  gClass8: 'https://webora-s3.imgix.net/uploads/protected/g-class-8.jpg',
  gClass9: 'https://webora-s3.imgix.net/uploads/protected/g-class-9.jpg',
  gClass10: 'https://webora-s3.imgix.net/uploads/protected/g-class-10.jpg',
  gClass11: 'https://webora-s3.imgix.net/uploads/protected/g-class-11.jpg',
  gClass12: 'https://webora-s3.imgix.net/uploads/protected/g-class-12.jpg',
  gClass13: 'https://webora-s3.imgix.net/uploads/protected/g-class-13.jpg',
  gClass14: 'https://webora-s3.imgix.net/uploads/protected/g-class-14.jpg',
  gClass15: 'https://webora-s3.imgix.net/uploads/protected/g-class-15.jpg',
  gClass16: 'https://webora-s3.imgix.net/uploads/protected/g-class-16.jpg',
  gClass17: 'https://webora-s3.imgix.net/uploads/protected/g-class-17.jpg',
  blurhash: createPngDataUri('LDB3g6~WR6I:~C-;s:S29ZI:x[xa'),
}

export const RECORDS_PER_PAGE = 12

export const navLinks = [
  { id: 1, href: routes.home, label: 'Home' },
  { id: 2, href: routes.inventory, label: 'Inventory' },
  { id: 3, href: routes.about, label: 'About' },
  { id: 4, href: routes.contact, label: 'Contact' },
]

export const SESSION_MAX_AGE = 7 * 24 * 60 * 60 * 1000 // 7 days in seconds
export const MAX_IMAGE_SIZE = 20 * 1000 * 1000 // 2mb
export const MAX_IMAGES = 20
export const sortOrder = ['asc', 'desc'] as const

export const ClassifiedBadgeMap: Record<
  ClassifiedStatus,
  BadgeProps['variant']
> = {
  [ClassifiedStatus.DRAFT]: 'secondary',
  [ClassifiedStatus.LIVE]: 'default',
  [ClassifiedStatus.SOLD]: 'destructive',
}

export const CustomerBadgeMap: Record<CustomerStatus, BadgeProps['variant']> = {
  [CustomerStatus.COLD]: 'secondary',
  [CustomerStatus.CONTACTED]: 'default',
  [CustomerStatus.INTERESTED]: 'destructive',
  [CustomerStatus.PURCHASED]: 'warning',
  [CustomerStatus.SUBSCRIBER]: 'info',
}
