import { PageSchema } from '@/app/schemas/page.schema'
import { CLASSIFIEDS_PER_PAGE } from '@/config/constants'
import type { AwaitedPageProps } from '@/config/types'
import { prisma } from '@/lib/prisma'
import { buildClassifiedFilterQuery } from '@/lib/utils'

export const getInventory = (
  searchParams: AwaitedPageProps['searchParams']
) => {
  const validPage = PageSchema.parse(searchParams?.page)

  // get the current page
  const page = validPage ? validPage : 1

  // calculate the offset
  const offset = (page - 1) * CLASSIFIEDS_PER_PAGE

  return prisma.classified.findMany({
    where: buildClassifiedFilterQuery(searchParams),
    include: { images: { take: 1 } },
    skip: offset,
    take: CLASSIFIEDS_PER_PAGE,
  })
}

export const sampleData = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  calendars: [
    {
      name: 'My Calendars',
      items: ['Personal', 'Work', 'Family'],
    },
    {
      name: 'Favorites',
      items: ['Holidays', 'Birthdays'],
    },
    {
      name: 'Other',
      items: ['Travel', 'Reminders', 'Deadlines'],
    },
  ],
}
