'use client'

import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { FilterOptions } from '@/types'
import type { ChangeEvent, SelectHTMLAttributes } from 'react'

interface SelectType
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  options: FilterOptions<string, number>
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void
}

interface RangeSelectProps {
  label: string
  minSelect: SelectType
  maxSelect: SelectType
}

export const RangeSelect = (props: RangeSelectProps) => {
  const { label, minSelect, maxSelect } = props

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="flex gap-2">
        <Select
          value={minSelect.value?.toString() || '_empty'}
          onValueChange={(value) => {
            minSelect.onChange({
              target: {
                name: minSelect.name,
                value: value === '_empty' ? '' : value,
              },
            } as ChangeEvent<HTMLSelectElement>)
          }}
          disabled={minSelect.disabled ?? false}
        >
          <SelectTrigger className="w-full rounded-sm">
            <SelectValue placeholder="Min" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="_empty">Min</SelectItem>
            {minSelect.options.map((option) => (
              <SelectItem key={option.value} value={option.value.toString()}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={maxSelect.value?.toString() || '_empty'}
          onValueChange={(value) => {
            maxSelect.onChange({
              target: {
                name: maxSelect.name,
                value: value === '_empty' ? '' : value,
              },
            } as ChangeEvent<HTMLSelectElement>)
          }}
          disabled={maxSelect.disabled ?? false}
        >
          <SelectTrigger className="w-full rounded-sm">
            <SelectValue placeholder="Max" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="_empty">Max</SelectItem>
            {maxSelect.options.map((option) => (
              <SelectItem key={option.value} value={option.value.toString()}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
