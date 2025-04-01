'use client'

import { FormLabel } from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useFilters } from '@/hooks/filters/use-filters'
import { useTaxonomyOptions } from '@/hooks/filters/use-taxonomy-options'
import type { ParamsAwaitedProps } from '@/types'
import type React from 'react'

export function MakeFilter({ searchParams }: ParamsAwaitedProps) {
  const { makes, isLoading } = useTaxonomyOptions(
    searchParams as Record<string, string> | undefined
  )
  const { handleChange } = useFilters(searchParams as Record<string, string>)

  return (
    <div className="space-y-2">
      <FormLabel htmlFor="make">Make</FormLabel>
      <Select
        name="make"
        value={(searchParams?.make as string) || '_empty'}
        onValueChange={(value) =>
          handleChange({
            target: { name: 'make', value: value === '_empty' ? '' : value },
          } as React.ChangeEvent<HTMLSelectElement>)
        }
        disabled={isLoading}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select make" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="_empty">Select</SelectItem>
          {makes.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
