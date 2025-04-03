'use server'

import { signIn as signInClient } from '@/auth'
import { routes } from '@/config/routes'
import { genericRateLimit } from '@/lib/rate-limiter'
import { SignInSchema } from '@/schemas/auth.schema'
import type { PrevState } from '@/types'
import { isRedirectError } from 'next/dist/client/components/redirect-error'

/**
 * Authenticates user credentials and initiates a sign-in session
 *
 * This server action validates user credentials against the authentication system,
 * implements rate limiting to prevent brute force attacks, and redirects to the
 * challenge page for two-factor authentication if successful.
 *
 * @param _ - Previous state (unused, required for Next.js Server Actions)
 * @param formData - Form data containing email and password credentials
 * @returns Object with success status and message
 *   - On success: { success: true, message: 'Signed in successfully!' }
 *   - On failure: { success: false, message: string } with reason for failure
 *   - On rate limit: The error response from the rate limiter
 * @throws Redirect error when authentication redirects the user
 */
export async function signIn(_: PrevState, formData: FormData) {
  try {
    const limiterError = await genericRateLimit('login')
    if (limiterError) {
      return limiterError
    }

    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const { data, success } = SignInSchema.safeParse({
      email,
      password,
    })

    if (!success) {
      return { success: false, message: 'Invalid Credentials' }
    }

    await signInClient('credentials', {
      email: data.email,
      password: data.password,
      redirect: true,
      redirectTo: routes.challenge,
    })

    return {
      success: true,
      message: 'Signed in successfully!',
    }
  } catch (error) {
    if (isRedirectError(error)) {
      throw error
    }
    return { success: false, message: 'Invalid Credentials' }
  }
}
