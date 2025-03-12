import { auth } from "@/auth"

/**
 * Get custom session claims for Clerk
 * This function is used to add custom claims to the Clerk session
 * It's particularly important for maintaining the 2FA flow
 */
export async function getCustomSessionClaims() {
  try {
    // Get current NextAuth session
    const session = await auth()

    if (!session) return {}

    // Return custom claims that match your current NextAuth properties
    return {
      requires2FA: session.requires2FA || false,
    }
  } catch (error) {
    console.error("Error getting custom session claims:", error)
    return {}
  }
}
