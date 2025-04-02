'use server'

import { auth } from '@/auth'
import { routes } from '@/config/routes'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

/**
 * Deletes a classified advertisement by ID
 *
 * This function permanently removes a classified listing from the database.
 * After deletion, it revalidates the admin classifieds route to refresh the
 * classifieds list view.
 *
 * Used in admin dashboard to manage inventory.
 *
 * @param id - The unique identifier of the classified to delete
 * @returns Object with success status and message
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
