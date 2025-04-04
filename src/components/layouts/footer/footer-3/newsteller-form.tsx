'use client'

import { subscribeCustomer } from '@/_data'
import { Button } from '@/components/ui/button'
import { Form, FormField, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { SubscribeSchema } from '@/schemas/subscribe.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { CircleCheckIcon, CircleX, Loader2 } from 'lucide-react'
import type React from 'react'
import { useActionState, useEffect, useRef } from 'react'
import { useFormStatus } from 'react-dom'
import { useForm } from 'react-hook-form'

export function NewsletterForm() {
  const [state, formAction] = useActionState(subscribeCustomer, {
    success: false,
    message: '',
  })

  const form = useForm({
    resolver: zodResolver(SubscribeSchema),
    mode: 'onChange',
  })

  const handleFormAction = async (formData: FormData) => {
    const valid = await form.trigger()
    if (!valid) {
      return
    }
    formAction(formData)
  }

  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (state.success && formRef.current) {
      formRef.current.reset()
    }
  }, [state.success])

  return (
    <Form {...form}>
      <form
        ref={formRef}
        action={handleFormAction}
        onSubmit={() => null}
        className="row-start-1 border-b pb-8 text-sm md:col-span-2 md:border-none lg:col-span-1"
      >
        <div className="space-y-4">
          <FormLabel htmlFor="mail" className="block font-medium">
            Subscribe to our inventory updates
          </FormLabel>
          {/*  */}
          <div className="grid grid-cols-2 gap-2">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="First Name"
                  className="h-8 text-sm"
                />
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="Last Name"
                  className="h-8 text-sm"
                />
              )}
            />
          </div>
          {/*  */}
          <div className="flex items-center gap-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <Input
                  {...field}
                  type="email"
                  id="mail"
                  name="mail"
                  placeholder="Your email"
                  className="h-8 text-sm"
                />
              )}
            />
            <SubscribeButton>Submit</SubscribeButton>
          </div>
          <span className="block text-muted-foreground text-sm">
            Don't miss any update!
          </span>
        </div>

        {state.success && (
          <div className="flex items-center gap-2 rounded-md bg-green-500 p-3 text-white">
            <CircleCheckIcon className="h-5 w-5" />
            <span>Success! {state.message}</span>
          </div>
        )}
        {!state.success && state.message && (
          <div className="flex items-center gap-2 rounded-md bg-green-500 p-3 text-white">
            <CircleX className="h-5 w-5" />
            <span>Error! {state.message}</span>
          </div>
        )}
      </form>
    </Form>
  )
}

function SubscribeButton({ children }: { children: React.ReactNode }) {
  const { pending } = useFormStatus()

  return (
    <Button
      disabled={pending}
      type="submit"
      size="sm"
      className="cursor-pointer"
    >
      {pending && (
        <Loader2 className="h-4 w-4 shrink-0 animate-spin" aria-hidden="true" />
      )}{' '}
      {children}
    </Button>
  )
}
