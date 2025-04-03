import { prisma } from '@/lib/prisma'

/**
 * Fetches a classified listing by its ID, including all associated images.
 *
 * This function retrieves a single classified record from the database based on its unique ID.
 * It includes all related image records in the response. Returns null if no ID is provided.
 * Used primarily in the admin panel for editing specific listings.
 *
 * @param {number} id - The numeric ID of the classified listing to retrieve.
 * @returns {Promise<(import('@prisma/client').Classified & { images: import('@prisma/client').Image[] }) | null>} A promise that resolves to the classified record with all its images, or null if the ID is invalid or the record is not found.
 */
export async function fetchClassifiedById(id: number) {
  if (!id) {
    return null
  }

  const classified = await prisma.classified.findUnique({
    where: { id },
    include: { images: true },
  })

  return classified
}
