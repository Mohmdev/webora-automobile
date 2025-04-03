'use server'

import { prisma } from '@/lib/prisma'
import {
  CreateCustomerSchema,
  type CreateCustomerType,
} from '@/schemas/customer.schema'

/**
 * Creates a new customer record, typically associated with a vehicle reservation.
 *
 * This server action validates the incoming customer data (`props`) against the `CreateCustomerSchema`.
 * It ensures the terms and conditions have been accepted.
 * If validation passes and terms are accepted, it extracts specific fields (`date`, `terms`, `slug`)
 * and creates a new `Customer` record in the database, connecting it to the specified `Classified` via its slug.
 *
 * @param {CreateCustomerType} props - An object containing the customer data, including personal details, reservation date (`date`), terms acceptance (`terms`), and the vehicle slug (`slug`).
 * @returns {Promise<{ success: boolean; message: string; }>} A promise resolving to an object indicating the outcome:
 *   - On successful creation: `{ success: true, message: 'Reservation Successful!' }`
 *   - On validation failure: `{ success: false, message: string }` detailing the validation error.
 *   - If terms not accepted: `{ success: false, message: 'You must accept the terms' }`
 *   - On other errors: `{ success: false, message: string }` detailing the error.
 */
export async function createCustomer(props: CreateCustomerType) {
  try {
    const { data, success, error } = CreateCustomerSchema.safeParse(props)

    if (!success) {
      return { success: false, message: `Invalid data: ${error.message}` }
    }

    if (data.terms !== 'true') {
      return { success: false, message: 'You must accept the terms' }
    }

    const { date, terms, slug, ...rest } = data

    await prisma.customer.create({
      data: {
        ...rest,
        bookingDate: date,
        termsAccepted: terms === 'true',
        classified: { connect: { slug } },
      },
    })

    return { success: true, message: 'Reservation Successful!' }
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, message: error.message }
    }

    return { success: false, message: 'Something went wrong' }
  }
}
