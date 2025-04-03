import { routes } from '@/config/routes'
import { prisma } from '@/lib/prisma'
import { ClassifiedStatus } from '@prisma/client'
import { redirect } from 'next/navigation'

/**
 * Fetches a classified listing by its slug, including basic make information.
 *
 * This function retrieves a single classified record from the database based on its unique slug.
 * It includes the associated `make` relation in the response. Returns null if no slug is provided
 * or if no classified with the specified slug exists.
 *
 * Used in the listing reserve flow where only basic details are needed.
 *
 * @param {string} slug - The unique slug identifier of the classified listing to retrieve.
 * @returns {Promise<(import('@prisma/client').Classified & { make: import('@prisma/client').Make }) | null>} A promise that resolves to the classified record with make information, or null if not found.
 */
export async function fetchClassifiedBySlug(slug: string) {
  if (!slug) {
    return null
  }

  return await prisma.classified.findUnique({
    where: { slug },
    include: { make: true },
  })
}

/**
 * Fetches a detailed classified listing by its slug, including make and all associated images.
 *
 * This function retrieves a single classified record along with its associated make and all images.
 * If `checkSoldStatus` is true (default), it redirects to a "not available" page if the classified
 * status is `SOLD`. Returns null if no slug is provided.
 *
 * Used in the main classified detail view page to display comprehensive information.
 *
 * @param {string} slug - The unique slug identifier of the classified listing to retrieve.
 * @param {boolean} [checkSoldStatus=true] - Whether to check the classified status and redirect if it's `SOLD`. Defaults to true.
 * @returns {Promise<(import('@prisma/client').Classified & { make: import('@prisma/client').Make; images: import('@prisma/client').Image[] }) | null>} A promise that resolves to the detailed classified record with make and images, or null if the slug is invalid. Note: This promise might not resolve if a redirect occurs.
 */
export async function fetchDetailedClassifiedBySlug(
  slug: string,
  checkSoldStatus = true
) {
  if (!slug) {
    return null
  }

  const classified = await prisma.classified.findUnique({
    where: { slug },
    include: { make: true, images: true },
  })

  if (checkSoldStatus && classified?.status === ClassifiedStatus.SOLD) {
    redirect(routes.notAvailable(classified.slug))
  }

  return classified
}
