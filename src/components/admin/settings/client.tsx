'use client'

import { signOutAllSessions } from '@/auth/actions'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'

const LogoutButton = () => {
  const { pending } = useFormStatus()

  return (
    <div className="mt-8 flex">
      <Button
        disabled={pending}
        className="flex items-center gap-x-2"
        variant="destructive"
        type="submit"
      >
        {pending && <Loader2 className="h-4 w-4 animate-spin" />}
        {pending ? 'Logging out...' : 'Log out of all sessions'}
      </Button>
    </div>
  )
}

export const AdminSettingsClient = () => {
  // Create a wrapper function that doesn't take parameters
  const signOutWrapper = () => signOutAllSessions()
  const [_, formAction] = useActionState(signOutWrapper, null)

  return (
    <div className="divide-y divide-white/5 px-6">
      <div className="grid max-w-7xl grid-cols-1 gap-x-8 md:grid-cols-3">
        <div>
          <h2 className="font-semibold text-base text-muted leading-7">
            Log out of all sessions
          </h2>
          <p className="mt-1 text-muted/75 text-sm leading-6">
            This will log out out of all of your sessions across all of your
            devices of which you are currently logged into.
          </p>
        </div>
        <form action={formAction} className="md:col-span-2">
          <LogoutButton />
        </form>
      </div>
    </div>
  )
}
