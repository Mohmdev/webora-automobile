'use client'

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { NumberInput } from '@/components/ui/number-input'
import { useFormContext } from 'react-hook-form'

interface FormNumberInputProps {
  name: string
  label: string
  min: number
  max: number
}

export const FormNumberInput = ({
  name,
  label,
  min,
  max,
}: FormNumberInputProps) => {
  const form = useFormContext()

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field: { onChange, ...rest } }) => (
        <FormItem>
          <FormLabel htmlFor={name}>{label}</FormLabel>
          <FormControl>
            <NumberInput
              max={max}
              min={min}
              placeholder="0"
              style={{ background: '#081a2b' }}
              className="text-muted placeholder:text-muted/75"
              onValueChange={(values) => {
                onChange(values.floatValue)
              }}
              {...rest}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
