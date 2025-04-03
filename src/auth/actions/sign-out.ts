'use server'

import { auth, signOut as signOutClient } from '@/auth'
import { routes } from '@/config/routes'

/**
 * Signs out the currently authenticated user from their session
 *
 * This server action checks for an active session and terminates it if present,
 * then redirects the user to the sign-in page. The function leverages NextAuth's
 * built-in signOut functionality to properly clear authentication tokens and cookies.
 *
 * @returns void - Redirects to the sign-in page if a session exists
 */
export async function signOut() {
  const session = await auth()
  if (session) {
    await signOutClient({
      redirect: true,
      redirectTo: routes.signIn,
    })
  }
}
