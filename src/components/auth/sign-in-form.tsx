'use client'

import { signIn } from '@/auth/actions/sign-in'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { CircleCheckIcon, CircleX, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useActionState, useEffect, useRef } from 'react'
import { useFormStatus } from 'react-dom'

const SubmitButton = () => {
  const { pending } = useFormStatus()

  return (
    <Button
      disabled={pending}
      type="submit"
      className="w-full cursor-pointer font-bold uppercase"
      size="sm"
    >
      {pending && (
        <Loader2 className="h-4 w-4 shrink-0 animate-spin" aria-hidden="true" />
      )}{' '}
      {pending ? 'Signing in...' : 'Sign In'}
    </Button>
  )
}

export const SignInForm = () => {
  const [state, formAction] = useActionState(signIn, {
    success: false,
    message: '',
  })
  const router = useRouter()
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (state.success && formRef.current) {
      router.refresh()
    }
  }, [state, router])

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center bg-white">
      <div className="w-full max-w-md pb-60">
        <form
          ref={formRef}
          action={formAction}
          className="rounded-md border border-muted bg-white p-10 shadow-lg"
        >
          <div className="mb-6 flex items-center justify-center">
            <h2 className="font-bold text-2xl uppercase">Sign In</h2>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                autoComplete="email"
                className="placeholder:text-gray-500"
                placeholder="Enter your email address"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                name="password"
                autoComplete="password"
                className="placeholder:text-gray-500"
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="my-6">
              <p className="mb-2 text-center text-gray-600 text-sm">
                Don't have an account?{' '}
                <a
                  href="/auth/sign-up"
                  className="text-blue-600 hover:underline"
                >
                  Sign up here
                </a>
              </p>
            </div>
            <div className="cursor-pointer space-y-4">
              <SubmitButton />
              {state.success && (
                <div className="flex items-center gap-2 rounded-md bg-green-500 p-3 text-white">
                  <CircleCheckIcon className="h-5 w-5" />
                  <span>Success! {state.message}</span>
                </div>
              )}
              {!state.success && state.message && (
                <div className="flex items-center gap-2 rounded-md bg-red-500 p-3 text-white">
                  <CircleX className="h-5 w-5" />
                  <span>Error! {state.message}</span>
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
