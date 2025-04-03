'use client'

import { fetchRecordsCount } from '@/_data'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { ResolvedParams } from '@/types'
import { useQuery } from '@tanstack/react-query'
import type { ButtonHTMLAttributes } from 'react'

interface CloseDialogButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  onClose?: () => void
  label?: string
}

export function CloseDialogButton({
  searchParams,
  className,
  onClose,
  label = 'View results',
  ...props
}: CloseDialogButtonProps & ResolvedParams) {
  const {
    data: { count } = { count: 0 },
  } = useQuery({
    queryKey: ['recordsCount', searchParams],
    queryFn: () => fetchRecordsCount(searchParams),
  })

  return (
    <Button
      type="button"
      onClick={onClose}
      className={cn('w-full', className)}
      {...props}
    >
      {label}
      {count && count > 0 ? ` (${count})` : null}
    </Button>
  )
}
