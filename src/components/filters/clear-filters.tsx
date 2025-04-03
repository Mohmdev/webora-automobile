'use client'

import { Button } from '@/components/ui/button'
import { useFilters } from '@/hooks/filters/use-filters'
import { cn } from '@/lib/utils'
import type { ResolvedParams } from '@/types'
import { type VariantProps, cva } from 'class-variance-authority'
import type { ButtonHTMLAttributes } from 'react'

const buttonVariants = cva('flex-1 py-1 text-sm', {
  variants: {
    look: {
      nonpersistent:
        'pointer-events-none max-h-max cursor-default text-gray-500 opacity-0 transition-opacity duration-200 ease-linear hover:underline',
      persistent:
        'border bg-background opacity-100 shadow-xs hover:bg-accent hover:text-accent-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50',
    },
  },
  defaultVariants: {
    look: 'persistent',
  },
})

type ClearFiltersProps = ResolvedParams &
  VariantProps<typeof buttonVariants> &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    label?: string
  }

export function ClearFilters({
  label = 'Clear Filters',
  look,
  className,
  searchParams,
  ...props
}: ClearFiltersProps) {
  const { filterCount = 0, clearFilters } = useFilters(
    searchParams as Record<string, string> | undefined
  )

  if (!clearFilters) {
    console.warn(
      'ClearFilters: No action function provided (action, onClearAction, or onClear)'
    )
  }

  return (
    <div className={cn('inline-flex items-center', className)}>
      <Button
        variant="unstyled"
        onClick={clearFilters}
        aria-disabled={!filterCount}
        className={cn(
          buttonVariants({ look }),
          look === 'persistent' && filterCount < 1
            ? 'disabled pointer-events-none cursor-default opacity-50'
            : '',
          look === 'nonpersistent' && filterCount > 0
            ? 'pointer-events-auto cursor-pointer opacity-100'
            : ''
        )}
        {...props}
      >
        {label} {filterCount ? `(${filterCount})` : '(0)'}
      </Button>
    </div>
  )
}
