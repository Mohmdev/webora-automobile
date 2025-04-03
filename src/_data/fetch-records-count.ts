import { RECORDS_PER_PAGE } from '@/config/constants'
import { prisma } from '@/lib/prisma'
import { buildClassifiedFilterQuery } from '@/lib/utils'
import type { FavouriteIds, ResolvedParams } from '@/types'

/**
 * Fetches the total count of classified records based on search parameters or favourite IDs.
 *
 * This function calculates the total number of classified records that match the provided
 * search parameters or belong to a list of favourite IDs. It also calculates the total
 * number of pages based on the `RECORDS_PER_PAGE` constant.
 *
 * @param {ResolvedParams['searchParams']} searchParams - The search parameters to filter the classified records.
 * @param {object} [options] - Optional parameters.
 * @param {FavouriteIds} [options.favouriteIds] - An array of favourite classified IDs to fetch count for.
 *                                                If provided, `searchParams` are ignored for filtering.
 * @returns {Promise<{ count: number; totalPages: number }>} A promise that resolves to an object containing the total count and total pages.
 */
export async function fetchRecordsCount(
  searchParams: ResolvedParams['searchParams'],
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
