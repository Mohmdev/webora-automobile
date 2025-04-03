import { prisma } from '@/lib/prisma'
import type { ClassifiedStatus } from '@prisma/client'

/**
 * Fetches the latest classified listings by their status, including all associated images.
 *
 * This function retrieves a specified number of the most recent classified records from the database
 * that match the given status. It includes all related images for each listing.
 * Returns an empty array if no status is provided.
 *
 * Used primarily on the homepage to display latest arrivals and in the admin panel for managing listings by status.
 *
 * @param {ClassifiedStatus} status - The status of the classified listings to retrieve.
 * @param {number} howMany - The maximum number of records to return.
 * @returns {Promise<Array<import('@prisma/client').Classified & { images: import('@prisma/client').Image[] }>>} A promise that resolves to an array of the latest classified records matching the status, including their images. Returns an empty array if no status is provided or no matching records are found.
 */
export async function fetchClassifiedsByStatus(
  status: ClassifiedStatus,
  howMany: number
) {
  if (!status) {
    return []
  }

  const classifieds = await prisma.classified.findMany({
    where: { status },
    take: howMany,
    include: { images: true },
    orderBy: { createdAt: 'desc' }, // Get the newest records
  })

  return classifieds
}
