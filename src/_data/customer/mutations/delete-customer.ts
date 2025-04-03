'use server'

import { routes } from '@/config/routes'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

/**
 * Deletes a customer record from the database by its ID.
 *
 * This server action attempts to remove a customer record using the provided ID.
 * If successful, it revalidates the admin customers path cache (`routes.admin.customers`)
 * to reflect the change in the UI.
 *
 * @param {number} id - The unique numeric identifier of the customer to delete.
 * @returns {Promise<{ success: boolean; message: string; }>} A promise resolving to an object indicating the outcome:
 *   - On successful deletion: `{ success: true, message: 'Customer deleted' }`
 *   - On failure (e.g., record not found, database error): `{ success: false, message: string }` detailing the error.
 */
export async function deleteCustomer(id: number) {
  try {
    await prisma.customer.delete({ where: { id } })
    revalidatePath(routes.admin.customers)
    return { success: true, message: 'Customer deleted' }
  } catch (error) {
    return {
      success: false,
      message: `Something went wrong deleting customer: ${error}`,
    }
  }
}
