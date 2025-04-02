import { prisma } from '@/lib/prisma'

/**
 * Fetches a classified listing by its ID with all image information
 *
 * This function retrieves a single classified record from the database based on its unique ID,
 * including all related images. Used primarily in the admin panel for editing listings.
 *
 * @param id - The numeric ID of the classified to retrieve
 * @returns The classified record with all images
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
