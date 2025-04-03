import { prisma } from '@/lib/prisma'
import { ClassifiedStatus } from '@prisma/client'

/**
 * Fetches the minimum and maximum values for year, price, and odometer reading
 * among all classifieds with a status of LIVE.
 *
 * This function performs an aggregation query on the `classified` table to find
 * the minimum and maximum values for specified fields.
 *
 * @returns {Promise<{ _min: { year: number | null; price: number | null; odoReading: number | null; }; _max: { price: number | null; year: number | null; odoReading: number | null; }; }>} A promise that resolves to an object containing the minimum and maximum values.
 */
export async function fetchMinMaxValues() {
  const minMaxResult = await prisma.classified.aggregate({
    where: { status: ClassifiedStatus.LIVE },
    _min: {
      year: true,
      price: true,
      odoReading: true,
    },
    _max: {
      price: true,
      year: true,
      odoReading: true,
    },
  })

  return minMaxResult
}
