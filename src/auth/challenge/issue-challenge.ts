'use server'

import { auth } from '@/auth'
import { issueChallenge as issueChallengeClient } from '@/lib/otp'
import { genericRateLimit } from '@/lib/rate-limiter'

/**
 * Issues a one-time password (OTP) challenge to the authenticated user
 *
 * This server action generates and sends a verification code to the user's
 * email address as part of the two-factor authentication flow. It includes
 * rate limiting to prevent abuse, allowing only a limited number of OTP requests
 * within a specific time window.
 *
 * @returns Object with success status and message
 *   - On success: { success: true, message: 'Code sent!' }
 *   - On failure: { success: false, message: string } with reason for failure
 *   - On rate limit: The error response from the rate limiter
 */
export async function issueChallenge() {
  const limiterError = await genericRateLimit('otp')
  if (limiterError) {
    return limiterError
  }

  const session = await auth()

  if (!session?.user) {
    return {
      success: false,
      message: 'Unauthorized',
    }
  }

  await issueChallengeClient(
    session.user.id as string,
    session.user.email as string
  )

  return {
    success: true,
    message: 'Code sent!',
  }
}
