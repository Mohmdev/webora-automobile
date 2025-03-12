import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"

/**
 * Sync user data between NextAuth and Clerk
 * This function is used to sync user data from NextAuth to Clerk
 * It's particularly important for maintaining the 2FA flow
 */
export async function syncUserDataToClerk(userId: string) {
  try {
    // Get the user from the database
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true },
    })

    if (!user) {
      console.error("User not found:", userId)
      return false
    }

    // Get the session to check for 2FA requirement
    const session = await auth()
    const requires2FA = session?.requires2FA || false

    // Update the user's public metadata in Clerk
    // This would typically be done via Clerk's API
    // For now, we'll just log it
    console.log("Syncing user data to Clerk:", {
      userId: user.id,
      email: user.email,
      requires2FA,
    })

    return true
  } catch (error) {
    console.error("Error syncing user data to Clerk:", error)
    return false
  }
}

/**
 * Get the current user's data from NextAuth
 * This function is used to get the current user's data from NextAuth
 */
export async function getCurrentUserData() {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return null
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { id: true, email: true },
    })

    if (!user) return null

    return {
      ...user,
      requires2FA: session.requires2FA || false,
    }
  } catch (error) {
    console.error("Error getting current user data:", error)
    return null
  }
}
