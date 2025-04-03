import { prisma } from '@/lib/prisma'
import { buildClassifiedFilterQuery } from '@/lib/utils'
import type { ResolvedParams } from '@/types'

/**
 * Fetches classified records matching the search parameters, selecting only the price field.
 *
 * This function queries the database for classified records based on the provided search parameters
 * using the `buildClassifiedFilterQuery` utility. It specifically selects only the `price`
 * field for each matching record.
 *
 * @param {ResolvedParams['searchParams']} searchParams - The search parameters used to filter the classified records.
 * @returns {Promise<{ price: number | null }[]>} A promise that resolves to an array of objects, each containing the price of a matching classified record.
 */
export async function fetchRecordsWithPriceSelect(
  searchParams: ResolvedParams['searchParams']
) {
  const recordsWithPrice = await prisma.classified.findMany({
    where: buildClassifiedFilterQuery(searchParams),
    select: {
      price: true,
    },
  })

  return recordsWithPrice
}
