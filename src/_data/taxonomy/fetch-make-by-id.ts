import { prisma } from '@/lib/prisma'

/**
 * Fetches a specific vehicle make by its ID.
 *
 * This function retrieves a unique `Make` record from the database based on the provided ID.
 * Used for obtaining detailed make information for display in listings, filters, or catalog pages.
 * Returns null if no `makeId` is provided or if no make is found with the specified ID.
 *
 * @param {number} makeId - The unique numeric identifier of the make to retrieve.
 * @returns {Promise<import('@prisma/client').Make | null>} A promise that resolves to the `Make` record if found, or null otherwise.
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
