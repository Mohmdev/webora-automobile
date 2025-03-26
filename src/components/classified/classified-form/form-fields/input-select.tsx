import type { FilterOptions } from '@/config/types'
import { cn } from '@/lib/utils'
import { useFormContext } from 'react-hook-form'
import type { NumericFormatProps } from 'react-number-format'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../../ui/form'
import { NumberInput } from '../../../ui/number-input'

interface InputSelectProps extends NumericFormatProps {
  inputName: string
  selectName: string
  label?: string
  options: FilterOptions<string, string>
  prefix?: string
}

export const InputSelect = (props: InputSelectProps) => {
  const { inputName, selectName, label, options, prefix, ...numberInputProps } =
    props

  const form = useFormContext()

  return (
    <div className="relative w-full">
      <FormField
        control={form.control}
        name={inputName}
        render={({ field: { onChange, ...rest } }) => (
          <FormItem>
            {label && <FormLabel htmlFor={inputName}>{label}</FormLabel>}
            <FormControl>
              <NumberInput
                style={{ backgroundColor: '#081a2b' }}
                className="text-muted/75"
                onValueChange={(values) => {
                  onChange(values.floatValue)
                }}
                {...rest}
                {...numberInputProps}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={selectName}
        render={({ field: { ref, ...rest } }) => (
          <FormItem>
            <FormControl>
              <div className="-translate-y-10 absolute right-0 flex h-10 items-center border-input border-l border-l-white/10 pr-2">
                <select
                  className={cn(
                    'custom-select appearance-none rounded-md border border-transparent bg-no-repeat pr-10 pl-3 text-muted/75 focus:outline-hidden focus:ring-0 focus-visible:ring-0 disabled:bg-white/10'
                  )}
                  {...rest}
                >
                  {options.map((option) => (
                    <option key={option.value} value={option.label}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </FormControl>
            <FormMessage className="text-red-500 text-sm" />
          </FormItem>
        )}
      />
    </div>
  )
}
