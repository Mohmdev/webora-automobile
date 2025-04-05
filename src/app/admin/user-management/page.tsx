import { updateExistingUsersToAdmin } from '@/app/admin/user-management/update-admin-users'
import type { Metadata } from 'next'
import { UpdateRolesClient } from './client'

export const metadata: Metadata = {
  title: 'Update User Roles - Admin',
  description: 'Update existing users to have the ADMIN role',
}

export default function UpdateRolesPage() {
  return (
    <UpdateRolesClient
      updateExistingUsersToAdminAction={updateExistingUsersToAdmin}
    />
  )
}
