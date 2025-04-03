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
import type { ResolvedParams } from '@/types'
import type React from 'react'

export function ModelVariantFilter({ searchParams }: ResolvedParams) {
  const { modelVariants, isLoading } = useTaxonomyOptions(
    searchParams as Record<string, string> | undefined
  )
  const { handleChange } = useFilters(searchParams as Record<string, string>)

  return (
    <div className="space-y-2">
      <Label htmlFor="modelVariant">Model Variant</Label>
      <Select
        name="modelVariant"
        value={(searchParams?.modelVariant as string) || '_empty'}
        onValueChange={(value) =>
          handleChange({
            target: {
              name: 'modelVariant',
              value: value === '_empty' ? '' : value,
            },
          } as React.ChangeEvent<HTMLSelectElement>)
        }
        disabled={!modelVariants.length || isLoading}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select model variant" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="_empty">Select</SelectItem>
          {modelVariants.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
