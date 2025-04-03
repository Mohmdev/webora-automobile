'use server'

import { auth } from '@/auth'
import { routes } from '@/config/routes'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

/**
 * Deletes a classified advertisement by its ID.
 *
 * This server action performs the following steps:
 * 1. Verifies user authentication.
 * 2. Attempts to delete the classified record from the database using the provided ID.
 * 3. If successful, revalidates the admin classifieds path cache (`routes.admin.classifieds`).
 * 4. Returns a structured response indicating success or failure.
 *
 * Used in the admin dashboard to permanently remove classified listings.
 *
 * @param {number} id - The unique numeric identifier of the classified listing to delete.
 * @returns {Promise<{ success: boolean; message?: string; error?: string }>} A promise resolving to an object indicating the outcome:
 *   - On success: `{ success: true, message: 'Classified deleted' }`
 *   - On failure (auth error, DB error, etc.): `{ success: false, error: string, message?: string }`
 */
export async function deleteClassified(id: number) {
  const session = await auth()
  if (!session) {
    return { success: false, error: 'Unauthorized' }
  }

  try {
    await prisma.classified.delete({ where: { id } })
    revalidatePath(routes.admin.classifieds)
    return { success: true, message: 'Classified deleted' }
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, message: error.message }
    }
    return { success: false, message: 'Something went wrong' }
  }
}
