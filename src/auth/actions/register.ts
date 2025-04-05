'use server'

import { signIn } from '@/auth'
import { routes } from '@/config/routes'
import { bcryptPasswordHash } from '@/lib/bcrypt'
import { prisma } from '@/lib/prisma'
import { RegisterSchema } from '@/schemas/register.schema'
import { UserRole } from '@prisma/client'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { revalidatePath } from 'next/cache'
import { isRedirectError } from 'next/dist/client/components/redirect-error'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

export type PrevState = {
  success?: boolean
  message?: string
}

/**
 * Registers a new customer user
 *
 * This server action validates the form data, creates a new user with CUSTOMER role,
 * and links it to a new or existing customer record.
 *
 * @param prevState - The previous state returned by the action
 * @param formData - The form data submitted by the user
 * @returns Object with success status and message
 */
export async function register(prevState: PrevState, formData: FormData) {
  try {
    const firstName = formData.get('firstName') as string
    const lastName = formData.get('lastName') as string
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const confirmPassword = formData.get('confirmPassword') as string
    const mobile = formData.get('mobile') as string
    const terms = formData.get('terms') as string

    const { success, error } = RegisterSchema.safeParse({
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      mobile,
      terms,
    })

    if (!success) {
      return {
        success: false,
        message: error.errors[0].message,
      }
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return {
        success: false,
        message: 'Email already in use',
      }
    }

    // Hash the password
    const hashedPassword = await bcryptPasswordHash(password)

    // Create the user with CUSTOMER role
    const user = await prisma.user.create({
      data: {
        email,
        hashedPassword,
        role: UserRole.CUSTOMER,
        requires2FA: false,
      },
    })

    // Check if a customer with this email already exists
    const existingCustomer = await prisma.customer.findFirst({
      where: { email },
    })

    if (existingCustomer) {
      // Link existing customer to the new user
      await prisma.customer.update({
        where: { id: existingCustomer.id },
        data: {
          userId: user.id,
          firstName,
          lastName,
          mobile: mobile || existingCustomer.mobile,
        },
      })
    } else {
      // Create a new customer record
      await prisma.customer.create({
        data: {
          firstName,
          lastName,
          email,
          mobile,
          termsAccepted: terms === 'true',
          status: 'SUBSCRIBER',
          userId: user.id,
        },
      })
    }

    // Determine the redirect path
    let redirectPath = routes.signIn
    try {
      const headersList = await headers()
      const referer = headersList.get('referer')
      if (referer) {
        const currentPath = new URL(referer).pathname

        // Special case: If user is registering from the sign-up page,
        // redirect to home instead of back to sign-up
        if (currentPath === routes.signUp) {
          redirectPath = routes.home
        } else {
          redirectPath = currentPath
        }
      }
    } catch (error) {
      console.error('Error getting headers:', error)
      // Fallback to sign-in page if there's an error
    }

    // Automatically sign in the user after successful registration
    // For customer users, we don't need to go through the challenge page
    await signIn('credentials', {
      email,
      password,
      redirect: true,
      redirectTo: redirectPath,
    })

    // If signIn doesn't redirect (which it should), fallback to manual redirect
    revalidatePath(redirectPath)
    redirect(redirectPath)
  } catch (error) {
    // If this is a redirect error, rethrow it to allow Next.js to handle the redirect
    if (isRedirectError(error)) {
      throw error
    }

    console.error('Registration error:', error)

    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      return {
        success: false,
        message: 'Email already in use',
      }
    }

    return {
      success: false,
      message: 'Something went wrong. Please try again.',
    }
  }
}
