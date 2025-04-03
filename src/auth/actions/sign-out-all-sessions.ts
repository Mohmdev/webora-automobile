'use server'

import { auth } from '@/auth'
import { routes } from '@/config/routes'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'

/**
 * Terminates all active sessions for the current user across all devices
 *
 * This server action performs a database operation to delete all session records
 * associated with the current user's ID, effectively logging them out from all
 * devices and browsers. After deletion, it redirects the user to the sign-in page.
 *
 * @returns null if no active session is found, otherwise redirects to sign-in page
 * @throws Redirect to the sign-in page after successful session deletion
 */
export async function signOutAllSessions() {
  const session = await auth()
  if (!session?.user?.id) {
    return null
  }
  await prisma.session.deleteMany({
    where: { userId: session.user.id },
  })

  redirect(routes.signIn)
}
