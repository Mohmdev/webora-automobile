'use client'

import { register } from '@/auth/actions/register'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { routes } from '@/config/routes'
import { CircleCheckIcon, CircleX, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useActionState, useRef } from 'react'
import { useFormStatus } from 'react-dom'

const initialState = {
  success: false,
  message: '',
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button
      type="submit"
      className="w-full"
      disabled={pending}
      aria-disabled={pending}
    >
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Creating account...
        </>
      ) : (
        'Create Account'
      )}
    </Button>
  )
}

export function RegisterForm() {
  const formRef = useRef<HTMLFormElement>(null)
  const [state, formAction] = useActionState(register, initialState)

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center bg-white">
      <div className="w-full max-w-md pb-60">
        <form
          ref={formRef}
          action={formAction}
          className="rounded-md border border-muted bg-white p-10 shadow-lg"
        >
          <div className="mb-6 flex items-center justify-center">
            <h2 className="font-bold text-2xl">Create Your Account</h2>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  autoComplete="given-name"
                  className="placeholder:text-gray-500"
                  placeholder="Enter your first name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  autoComplete="family-name"
                  className="placeholder:text-gray-500"
                  placeholder="Enter your last name"
                  required
                />
              </div>
            </div>
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
              <Label htmlFor="mobile">Mobile (Optional)</Label>
              <Input
                id="mobile"
                type="tel"
                name="mobile"
                autoComplete="tel"
                className="placeholder:text-gray-500"
                placeholder="Enter your mobile number"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                name="password"
                autoComplete="new-password"
                className="placeholder:text-gray-500"
                placeholder="Create a password"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                autoComplete="new-password"
                className="placeholder:text-gray-500"
                placeholder="Confirm your password"
                required
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" name="terms" value="true" />
              <Label htmlFor="terms" className="text-sm">
                I agree to the{' '}
                <Link href="/terms" className="text-blue-600 hover:underline">
                  Terms and Conditions
                </Link>
              </Label>
            </div>

            <div className="space-y-4">
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
            <div className="text-center text-sm">
              Already have an account?{' '}
              <Link
                href={routes.signIn}
                className="text-blue-600 hover:underline"
              >
                Sign In
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
