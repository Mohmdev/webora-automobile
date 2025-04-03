'use server'

import { prisma } from '@/lib/prisma'
import { SubscribeSchema } from '@/schemas/subscribe.schema'
import type { PrevState } from '@/types'
import { CustomerStatus } from '@prisma/client'
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from '@prisma/client/runtime/library'

/**
 * Subscribes a user to marketing communications and newsletters by creating a customer record.
 *
 * This server action takes form data, validates it against the `SubscribeSchema`,
 * checks if a customer with the provided email already exists, and if not,
 * creates a new `Customer` record with the status set to `SUBSCRIBER`.
 * Handles specific Prisma errors for more informative feedback.
 *
 * Designed to be used with `useFormState` hook, hence the `prevState` parameter.
 *
 * @param {PrevState} _ - The previous state returned by the action (unused in this implementation).
 * @param {FormData} formData - The form data submitted by the user, expected to contain `firstName`, `lastName`, and `email`.
 * @returns {Promise<{ success: boolean; message: string; }>} A promise resolving to an object indicating the outcome:
 *   - On successful subscription: `{ success: true, message: 'Subscribed successfully!' }`
 *   - If validation fails: `{ success: false, message: string }` detailing the Zod validation error.
 *   - If email already subscribed: `{ success: false, message: 'You are already subscribed!' }`
 *   - On Prisma/database errors: `{ success: false, message: string }` detailing the specific error.
 *   - On other errors: `{ success: false, message: 'Something went wrong!' }`
 */
export async function subscribeCustomer(_: PrevState, formData: FormData) {
  try {
    const { data, success, error } = SubscribeSchema.safeParse({
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      email: formData.get('email') as string,
    })

    if (!success) {
      return { success: false, message: error.message }
    }

    const subscriber = await prisma.customer.findFirst({
      where: { email: data.email },
    })

    if (subscriber) {
      return { success: false, message: 'You are already subscribed!' }
    }

    await prisma.customer.create({
      data: {
        ...data,
        status: CustomerStatus.SUBSCRIBER,
      },
    })

    return { success: true, message: 'Subscribed successfully!' }
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      return { success: false, message: error.message }
    }
    if (error instanceof PrismaClientValidationError) {
      return { success: false, message: error.message }
    }
    if (error instanceof Error) {
      return { success: false, message: error.message }
    }
    return { success: false, message: 'Something went wrong!' }
  }
}
