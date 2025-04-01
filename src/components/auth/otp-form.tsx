'use client'

import {
  completeChallengeAction,
  resendChallengeAction,
} from '@/app/_actions/challenge'
import { routes } from '@/config/routes'
import { toast } from '@/hooks/use-toast'
import { OneTimePasswordSchema, type OtpSchemaType } from '@/schemas/otp.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, RotateCw } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState, useTransition } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { Button } from '../ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { OneTimePasswordInput } from './otp-input'

export const OtpForm = () => {
  const [isCodePending, startCodeTransition] = useTransition()
  const [isSubmitPending, startSubmitTransition] = useTransition()
  const router = useRouter()

  const form = useForm<OtpSchemaType>({
    resolver: zodResolver(OneTimePasswordSchema),
  })

  const onSubmit: SubmitHandler<OtpSchemaType> = (data) => {
    startSubmitTransition(async () => {
      const result = await completeChallengeAction(data.code)
      // console.log('first', { result })

      if (result?.success) {
        router.push(routes.admin.dashboard)
      } else {
        toast({
          title: 'Error',
          description: result.message,
          variant: 'destructive',
        })
      }
    })
  }

  const [sendButtonText, setSendButtonText] = useState('Send code')

  const sendCode = () => {
    startCodeTransition(async () => {
      const { success, message } = await resendChallengeAction()
      setSendButtonText('Resend code')

      if (!success) {
        toast({
          title: 'Error',
          description: message,
          variant: 'destructive',
        })
        return
      }

      toast({
        title: 'Code sent',
        description: 'Check your email for the code',
      })
    })
  }

  useEffect(() => {
    if (isCodePending) {
      setSendButtonText('Sending...')
    }
  }, [isCodePending])

  return (
    <div className="flex min-h-[calc(100vh-4rem)] w-full flex-1 justify-center px-6 pt-10 lg:items-center lg:pt-0">
      <div className="flex w-full max-w-lg flex-col">
        <h3 className="mb-4 text-center text-4xl lg:text-5xl">
          One Time Password
        </h3>
        <p className="mb-12 text-center text-slate-500">
          Enter the six digit code sent to your email
        </p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="code"
              render={({ field: { value, onChange, ...rest } }) => (
                <FormItem className="mb-8">
                  <FormControl>
                    <OneTimePasswordInput
                      type="number"
                      setValue={onChange}
                      {...rest}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex w-full items-center justify-center">
              <button
                type="button"
                className="items-centewr group flex cursor-pointer gap-2.5 font-medium text-base text-slate-600 transition-colors duration-200 hover:text-primary"
                onClick={sendCode}
                disabled={isCodePending}
              >
                {isCodePending ? (
                  <Loader2 className="h-6 w-6 animate-spin text-secondary transition-colors duration-200 group-hover:text-primary" />
                ) : (
                  <RotateCw className="h-6 w-6 text-secondary transition-colors duration-200 group-hover:text-primary" />
                )}
                {sendButtonText}
              </button>
            </div>
            <div className="mt-6 flex w-full flex-col gap-4 md:mt-16">
              <Button
                className="flex w-full gap-x-2"
                disabled={isSubmitPending}
              >
                <span className="text-inherit text-sm uppercase tracking-wider">
                  {isSubmitPending ? 'Verifying...' : 'Verify'}
                </span>
                {isSubmitPending ? (
                  <Loader2 className="h-4 w-4 shrink-0 animate-spin" />
                ) : null}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}
