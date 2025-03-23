'use client'

import type { FilterOptions } from '@/config/types'
import type { SelectHTMLAttributes } from 'react'

interface SelectType extends SelectHTMLAttributes<HTMLSelectElement> {
  options: FilterOptions<string, number>
}

interface RangeSelectProps {
  label: string
  minSelect: SelectType
  maxSelect: SelectType
}
export const RangeSelect = (props: RangeSelectProps) => {
  const { label, minSelect, maxSelect } = props

  return (
    <>
      <h4 className="font-semibold text-sm">{label}</h4>
      <div className="!mt-1 flex gap-2">
        <select
          {...minSelect}
          className="custom-select w-full flex-1 appearance-none rounded-md border bg-no-repeat py-2 pr-12 pl-3"
        >
          <option value="">Select</option>
          {minSelect.options.map((option) => {
            return (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            )
          })}
        </select>
        <select
          {...maxSelect}
          className="custom-select w-full flex-1 appearance-none rounded-md border bg-no-repeat py-2 pr-12 pl-3"
        >
          <option value="">Select</option>
          {maxSelect.options.map((option) => {
            return (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            )
          })}
        </select>
      </div>
    </>
  )
}
