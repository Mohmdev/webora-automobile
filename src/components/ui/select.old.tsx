import { cn } from '@/lib/utils'
import type { ChangeEvent, SelectHTMLAttributes } from 'react'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  value: string
  options: { label: string; value: string }[]
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void
  className?: string
  selectClassName?: string
  noDefault?: boolean
}

export const Select = (props: SelectProps) => {
  const {
    label,
    value,
    options,
    onChange,
    className,
    selectClassName,
    noDefault = true,
    ...rest
  } = props

  return (
    <div className={cn('mt-1', className)}>
      {label && <h4 className="font-semibold text-sm">{label}</h4>}
      <div className="mt-1">
        <select
          onChange={onChange}
          value={value ?? ''}
          className={cn(
            selectClassName,
            'disabled:!bg-gray-100 custom-select w-full appearance-none rounded-md border border-input bg-no-repeat px-3 py-2 pr-12 focus:outline-hidden'
          )}
          {...rest}
        >
          {noDefault && <option value="">Select</option>}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
