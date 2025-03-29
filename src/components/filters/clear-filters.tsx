'use client'

import { useSidebarFilters } from '@/hooks/filters/useSidebarFilters'
import { cn } from '@/lib/utils'
import type { SearchAwaitedProps } from '@/types'
import type { ButtonHTMLAttributes } from 'react'

export function ClearFilters({
  label = 'Clear all',
  className,
  searchParams,
  ...props
}: SearchAwaitedProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { label?: string }) {
  const { filterCount, clearFilters } = useSidebarFilters(
    searchParams as Record<string, string>
  )

  if (!clearFilters) {
    console.warn(
      'ClearFilters: No action function provided (action, onClearAction, or onClear)'
    )
  }

  return (
    <div className={cn('flex items-center', className)}>
      <button
        type="button"
        onClick={clearFilters}
        aria-disabled={!filterCount}
        className={cn(
          'pointer-events-none max-h-max cursor-default py-1 text-gray-500 text-sm opacity-0 transition-opacity duration-200 ease-linear hover:underline',
          filterCount && filterCount > 0
            ? 'pointer-events-auto cursor-pointer opacity-100'
            : ''
        )}
        {...props}
      >
        {label} {filterCount ? `(${filterCount})` : '(0)'}
      </button>
    </div>
  )
}
