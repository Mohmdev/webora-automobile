import { prisma } from '@/lib/prisma'
import type { ClassifiedStatus } from '@prisma/client'

/**
 * Fetches classified listings by status with all image information
 *
 * This function retrieves the latest classified records from the database based on their status,
 * including all related images. Used primarily on the homepage to display latest arrivals
 * and in the admin panel for listing management.
 *
 * @param status - The status of the classifieds to retrieve
 * @param howMany - Maximum number of records to return
 * @returns Array of classified records with images (empty array if none found)
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
