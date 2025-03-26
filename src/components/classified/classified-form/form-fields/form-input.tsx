'use client'

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { useFormContext } from 'react-hook-form'

interface FormInputProps {
  name: string
  label: string
  placeholder: string
  className?: string
  additionalProps?: Record<string, unknown>
}

export const FormInput = ({
  name,
  label,
  placeholder,
  className,
  additionalProps,
}: FormInputProps) => {
  const form = useFormContext()

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field: { ref, ...rest } }) => (
        <FormItem>
          <FormLabel htmlFor={name}>{label}</FormLabel>
          <FormControl>
            <Input
              placeholder={placeholder}
              className={cn(
                'mt-1 h-10 bg-primary-800 text-muted placeholder:text-muted/75',
                className
              )}
              {...rest}
              {...additionalProps}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
