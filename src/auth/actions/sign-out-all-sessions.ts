'use server'

import { auth, signOut as signOutClient } from '@/auth'
import { prisma } from '@/lib/prisma'

export async function signOutAllSessions() {
  const session = await auth()
  if (!session?.user?.id) {
    return null
  }

  // Delete all sessions from database
  await prisma.session.deleteMany({
    where: { userId: session.user.id },
  })

  // Clear current session
  await signOutClient()
}
