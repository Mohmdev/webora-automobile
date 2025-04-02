'use client'

import { Label } from '@/components/ui/label'
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

export function ModelFilter({ searchParams }: ParamsAwaitedProps) {
  const { models, isLoading } = useTaxonomyOptions(
    searchParams as Record<string, string> | undefined
  )
  const { handleChange } = useFilters(searchParams as Record<string, string>)

  return (
    <div className="space-y-2">
      <Label htmlFor="model">Model</Label>
      <Select
        name="model"
        value={(searchParams?.model as string) || '_empty'}
        onValueChange={(value) =>
          handleChange({
            target: { name: 'model', value: value === '_empty' ? '' : value },
          } as React.ChangeEvent<HTMLSelectElement>)
        }
        disabled={!models.length || isLoading}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select model" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="_empty">Select</SelectItem>
          {models.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
