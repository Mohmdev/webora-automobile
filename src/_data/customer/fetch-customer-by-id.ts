import { prisma } from '@/lib/prisma'
import { z } from 'zod'

/**
 * Fetches a customer by their ID, including their associated classified and lifecycle information.
 *
 * This function retrieves a single customer record from the database based on the provided ID.
 * It validates the ID to ensure it's a positive number before querying the database.
 * The response includes related `classified` and `lifecycle` data.
 *
 * @param {string | number} id - The ID of the customer to fetch. Can be a string or a number, will be coerced to a number.
 * @returns {Promise<(import('@prisma/client').Customer & { classified: import('@prisma/client').Classified | null; lifecycle: import('@prisma/client').Lifecycle | null; }) | null>} A promise that resolves to the customer object with related data, or null if the ID is invalid or the customer is not found.
 */
export async function fetchCustomerById(id: string | number) {
  const idSchema = z.coerce.number().positive()

  const parsedId = idSchema.safeParse(id)

  if (!parsedId.success) {
    return null
  }

  const customer = await prisma.customer.findUnique({
    where: { id: parsedId.data },
    include: { classified: true, lifecycle: true },
  })

  return customer
}
