'use client'

import { signOutAllSessions } from '@/auth/actions'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'

export const SignOutAllSessionsForm = () => {
  const signOutWrapper = () => signOutAllSessions()
  const [_, formAction] = useActionState(signOutWrapper, null)

  return (
    <form action={formAction} className="w-full cursor-pointer lg:w-max">
      <SignOutAllSessionsButton />
    </form>
  )
}

const SignOutAllSessionsButton = () => {
  const { pending } = useFormStatus()
  return (
    <Button
      type="submit"
      disabled={pending}
      className="flex items-center gap-2"
      size="sm"
    >
      {pending && <Loader2 className="h-4 w-4 animate-spin" />}
      {pending ? 'Signing out...' : 'Sign out'}
    </Button>
  )
}
