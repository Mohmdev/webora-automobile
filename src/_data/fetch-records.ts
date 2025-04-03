import { RECORDS_PER_PAGE } from '@/config/constants'
import { prisma } from '@/lib/prisma'
import { buildClassifiedFilterQuery } from '@/lib/utils'
import { PageSchema } from '@/schemas/page.schema'
import type { FavouriteIds, ResolvedParams } from '@/types'

/**
 * Fetches a paginated list of classified records based on search parameters or favourite IDs.
 *
 * This function retrieves classified records matching the specified criteria.
 * It supports pagination using the `page` search parameter and the `RECORDS_PER_PAGE` constant.
 * It can filter records based on general search parameters or a specific list of favourite IDs.
 * Optionally, it can include a limited number of associated images for each record.
 *
 * @param {ResolvedParams['searchParams']} searchParams - The search parameters, including the optional `page` parameter for pagination.
 * @param {object} [options] - Optional parameters for fetching.
 * @param {FavouriteIds} [options.favouriteIds] - An array of favourite classified IDs. If provided, `searchParams` are ignored for filtering, but used for pagination.
 * @param {number} [options.includedImagesCount=5] - The maximum number of images to include for each classified record. Defaults to 5.
 * @returns {Promise<Array<import('@prisma/client').Classified & { images: import('@prisma/client').Image[] }>>} A promise that resolves to an array of classified records, potentially including their images.
 */
export async function fetchRecords(
  searchParams: ResolvedParams['searchParams'],
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
