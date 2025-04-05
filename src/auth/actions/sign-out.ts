'use server'

import { auth, signOut as signOutClient } from '@/auth'

export async function signOut() {
  const session = await auth()
  if (session) {
    await signOutClient()
  }
}
