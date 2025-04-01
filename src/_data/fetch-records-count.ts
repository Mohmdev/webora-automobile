import { RECORDS_PER_PAGE } from '@/config/constants'
import { prisma } from '@/lib/prisma'
import { buildClassifiedFilterQuery } from '@/lib/utils'
import type { FavouriteIds, ParamsAwaitedProps } from '@/types'

export async function fetchRecordsCount(
  searchParams: ParamsAwaitedProps['searchParams'],
  options?: {
    favouriteIds?: FavouriteIds
  }
) {
  const whereClause = options?.favouriteIds
    ? { id: { in: options.favouriteIds } }
    : buildClassifiedFilterQuery(searchParams)

  const count = await prisma.classified.count({
    where: whereClause,
  })

  const totalPages = Math.ceil(count / RECORDS_PER_PAGE)

  return { count, totalPages }
}
