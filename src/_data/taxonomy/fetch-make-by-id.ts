import { prisma } from '@/lib/prisma'

/**
 * Fetches a specific vehicle make by its ID
 *
 * This function retrieves a unique make record from the database based on the provided ID.
 * Used for detailed make information in vehicle listings, filters, and catalog pages.
 * Returns null if no make is found with the specified ID.
 *
 * @param makeId - The unique identifier of the make to retrieve
 * @returns The make record if found, or null if not found
 */
export async function fetchMakeById(makeId: number) {
  if (!makeId) {
    return null
  }

  const make = await prisma.make.findUnique({
    where: { id: Number(makeId) },
  })

  return make
}
