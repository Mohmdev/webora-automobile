'use client'

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { FilterOptions } from '@/config/types'
import { useFormContext } from 'react-hook-form'

interface FormTaxonomySelectProps {
  name: string
  label: string
  options: FilterOptions<string, string>
  disabled?: boolean
  placeholder?: string
  emptyOption?: boolean
  onValueChange?: (value: string) => void
}

export const FormTaxonomySelect = ({
  name,
  label,
  options,
  disabled = false,
  placeholder,
  emptyOption = true,
  onValueChange,
}: FormTaxonomySelectProps) => {
  const form = useFormContext()

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field: { onChange, ...rest } }) => (
        <FormItem>
          <FormLabel htmlFor={name}>{label}</FormLabel>
          <FormControl>
            <Select
              onValueChange={(value) => {
                if (onValueChange) {
                  onValueChange(value)
                }
                onChange(value)
              }}
              disabled={disabled}
              {...rest}
            >
              <SelectTrigger className="w-full border-transparent bg-primary-800 text-muted/75">
                <SelectValue
                  placeholder={placeholder || `Select ${label.toLowerCase()}`}
                />
              </SelectTrigger>
              <SelectContent>
                {emptyOption && <SelectItem value="_empty">Select</SelectItem>}
                {options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
