'use client'

import { Button } from '@/components/ui/button'
import { useState } from 'react'

interface UpdateRolesClientProps {
  updateExistingUsersToAdminAction: () => Promise<{
    success: boolean
    message: string
    updatedUsers: number
  }>
}

export function UpdateRolesClient({
  updateExistingUsersToAdminAction,
}: UpdateRolesClientProps) {
  const [result, setResult] = useState<{
    success?: boolean
    message?: string
    updatedUsers?: number
  }>({})
  const [isLoading, setIsLoading] = useState(false)

  const handleUpdateRoles = async () => {
    setIsLoading(true)
    try {
      const result = await updateExistingUsersToAdminAction()
      setResult(result)
    } catch (error) {
      setResult({
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-6 font-bold text-2xl invert">Update User Roles</h1>
      <div className="mb-6 rounded-md border p-4">
        <p className="mb-4 invert">
          This utility will update all existing users to have the ADMIN role.
          This should be run once after the schema migration.
        </p>
        <Button
          onClick={handleUpdateRoles}
          disabled={isLoading}
          className="bg-blue-600 hover:bg-blue-700"
        >
          {isLoading ? 'Updating...' : 'Update Existing Users to Admin'}
        </Button>
      </div>

      {result.message && (
        <div
          className={`mt-4 rounded-md p-4 ${
            result.success
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          <p className="font-medium">
            {result.success ? 'Success!' : 'Error!'}
          </p>
          <p>{result.message}</p>
          {result.updatedUsers !== undefined && (
            <p>Updated {result.updatedUsers} users</p>
          )}
        </div>
      )}
    </div>
  )
}
