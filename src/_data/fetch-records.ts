import { RECORDS_PER_PAGE } from '@/config/constants'
import { prisma } from '@/lib/prisma'
import { buildClassifiedFilterQuery } from '@/lib/utils'
import { PageSchema } from '@/schemas/page.schema'
import type { FavouriteIds, ParamsAwaitedProps } from '@/types'

export async function fetchRecords(
  searchParams: ParamsAwaitedProps['searchParams'],
  options?: {
    favouriteIds?: FavouriteIds
    includedImagesCount?: number
  }
) {
  const validPage = PageSchema.parse(searchParams?.page)

  const page = validPage ? validPage : 1 // get the current page
  const offset = (page - 1) * RECORDS_PER_PAGE // calculate the offset

  const whereClause = options?.favouriteIds
    ? { id: { in: options.favouriteIds } }
    : buildClassifiedFilterQuery(searchParams)

  const records = await prisma.classified.findMany({
    where: whereClause,
    include: { images: { take: options?.includedImagesCount ?? 5 } },
    skip: offset,
    take: RECORDS_PER_PAGE,
  })

  return records
}
