'use server'

import { routes } from '@/config/routes'
import { prisma } from '@/lib/prisma'
import { UpdateCustomerSchema } from '@/schemas/customer.schema'
import type { CustomerStatus } from '@prisma/client'
import { revalidatePath } from 'next/cache'

/**
 * Updates a customer's status and records the change in their lifecycle history.
 *
 * This server action performs the following steps:
 * 1. Validates the input properties (`id`, `status`) against the `UpdateCustomerSchema`.
 * 2. Fetches the customer by ID to ensure they exist.
 * 3. Updates the customer's `status` field with the new status.
 * 4. Creates a new `Lifecycle` record linked to the customer, logging the old and new status.
 * 5. Revalidates the cache for the specific customer edit page and the main admin customers list page.
 * 6. Returns a structured response indicating success or failure.
 *
 * @param {object} props - An object containing the customer update information.
 * @param {number} props.id - The unique numeric identifier of the customer to update.
 * @param {CustomerStatus} props.status - The new status to assign to the customer.
 * @returns {Promise<{ success: boolean; message: string; }>} A promise resolving to an object indicating the outcome:
 *   - On successful update: `{ success: true, message: 'Customer updated' }`
 *   - If validation fails: `{ success: false, message: string }` detailing the Zod validation error.
 *   - If customer not found: `{ success: false, message: 'Customer not found' }`
 *   - On other errors: `{ success: false, message: string }` detailing the error.
 */
export async function updateCustomer(props: {
  id: number
  status: CustomerStatus
}) {
  try {
    const validProps = UpdateCustomerSchema.safeParse(props)

    if (!validProps.success) {
      return { success: false, message: `Invalid data: ${validProps.error}` }
    }

    const customer = await prisma.customer.findUnique({
      where: { id: validProps.data?.id },
    })

    if (!customer) {
      return { success: false, message: 'Customer not found' }
    }

    console.log({
      oldStatus: customer.status,
      newStatus: validProps.data.status,
    })
    await prisma.customer.update({
      where: { id: customer.id },
      data: {
        status: validProps.data.status,
        lifecycle: {
          create: {
            oldStatus: customer.status,
            newStatus: validProps.data.status,
          },
        },
      },
    })

    revalidatePath(routes.admin.editCustomer(customer.id))
    revalidatePath(routes.admin.customers)

    return { success: true, message: 'Customer updated' }
  } catch (error) {
    if (error instanceof Error) {
      return {
        success: false,
        message: `Error in customer update action: ${error.message}`,
      }
    }
    return { success: false, message: 'Something went wrong' }
  }
}
