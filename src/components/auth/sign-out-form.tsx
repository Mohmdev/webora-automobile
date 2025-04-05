'use client'

import { signOut } from '@/auth/actions'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'

export const SignOutForm = () => {
  const signOutWrapper = () => signOut()
  const [_, formAction] = useActionState(signOutWrapper, null)

  return (
    <form action={formAction} className="w-full cursor-pointer lg:w-max">
      <SignOutButton />
    </form>
  )
}

const SignOutButton = () => {
  const { pending } = useFormStatus()
  return (
    <Button
      type="submit"
      disabled={pending}
      className="flex cursor-pointer items-center gap-2"
      size="sm"
    >
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      Sign out
    </Button>
  )
}
