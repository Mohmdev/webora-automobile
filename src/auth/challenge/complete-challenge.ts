'use server'

import { auth } from '@/auth'
import { completeChallenge as completeChallengeClient } from '@/lib/otp'

/**
 * Verifies and completes the OTP challenge for the authenticated user
 *
 * This server action validates the one-time password (OTP) code provided by the user
 * against the stored challenge. It serves as the second factor in the authentication
 * process, verifying the user's identity before granting full access to the application.
 *
 * @param code - The verification code entered by the user
 * @returns Object with success status and message
 *   - On success: { success: true, message: string } with success message
 *   - On failure: { success: false, message: string } with reason for failure
 */
export async function completeChallenge(code: string) {
  const session = await auth()

  if (!session?.user) {
    return {
      success: false,
      message: 'Unauthorized',
    }
  }

  const { id } = session.user
  const result = await completeChallengeClient(id as string, code)

  return result
}
