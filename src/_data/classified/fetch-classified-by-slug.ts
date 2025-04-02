import { routes } from '@/config/routes'
import { prisma } from '@/lib/prisma'
import { ClassifiedStatus } from '@prisma/client'
import { redirect } from 'next/navigation'

/**
 * Fetches a classified listing by its slug with basic make details
 *
 * This function retrieves a single classified record from the database based on its slug,
 * including the associated make information. Used in the listing reserve flow.
 * Throws a "not found" error if no classified with the specified slug exists.
 *
 * @param slug - The unique slug identifier of the classified to retrieve
 * @returns The classified record with make information
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
 * Fetches a detailed classified listing by its slug with make and images
 *
 * This function retrieves a single classified record with its associated make and images.
 * Used in the main classified view/detail page to display comprehensive information.
 * Redirects to "not available" page if the classified is marked as sold.
 *
 * @param slug - The unique slug identifier of the classified to retrieve
 * @param checkSoldStatus - Whether to check and redirect if the listing is sold (default: true)
 * @returns The classified record with make and images information
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
