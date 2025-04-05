'use server'

import { prisma } from '@/lib/prisma'
import { UserRole } from '@prisma/client'

/**
 * Updates all existing users to have the ADMIN role
 *
 * This script is meant to be run once after the schema migration
 * to ensure all existing users are properly set as admins.
 */
export async function updateExistingUsersToAdmin() {
  try {
    // Get all users - we'll update all of them to be admins
    // This is safer than trying to filter for null/undefined roles
    // which can cause type issues with Prisma
    const users = await prisma.user.findMany()

    console.log(`Found ${users.length} users to update`)

    // Update all users to have the ADMIN role
    const updatePromises = users.map((user) =>
      prisma.user.update({
        where: { id: user.id },
        data: {
          role: UserRole.ADMIN,
          requires2FA: true,
        },
      })
    )

    const results = await Promise.all(updatePromises)

    return {
      success: true,
      message: `Updated ${results.length} users to ADMIN role`,
      updatedUsers: results.length,
    }
  } catch (error) {
    console.error('Error updating users:', error)
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error',
      updatedUsers: 0,
    }
  }
}
