'use client'

import { FormLabel } from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useSidebarFilters } from '@/hooks/filters/use-sidebar-filters'
import { useTaxonomyOptions } from '@/hooks/filters/use-taxonomy-options'
import type { ParamsAwaitedProps } from '@/types'
import type React from 'react'

export function ModelVariantFilter({ searchParams }: ParamsAwaitedProps) {
  const { modelVariants, isLoading } = useTaxonomyOptions(
    searchParams as Record<string, string> | undefined
  )
  const { handleChange } = useSidebarFilters(
    searchParams as Record<string, string>
  )

  return (
    <div className="space-y-2">
      <FormLabel htmlFor="modelVariant">Model Variant</FormLabel>
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
