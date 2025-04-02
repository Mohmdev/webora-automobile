import { prisma } from '@/lib/prisma'
import { z } from 'zod'

/**
 * Fetches a customer by their ID including their classified and lifecycle information
 *
 * @param id - The customer ID to fetch
 * @returns The customer object with all related data, or null if not found or invalid ID
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
