import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { ButtonHTMLAttributes } from 'react'

interface CloseDialogButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  resultsCount?: number
  className?: string
  onClose?: () => void
  label?: string
}

export function CloseDialogButton({
  resultsCount = 0,
  className,
  onClose,
  label = 'View results',
  ...props
}: CloseDialogButtonProps) {
  return (
    <Button
      type="button"
      onClick={onClose}
      className={cn('w-full', className)}
      {...props}
    >
      {label}
      {resultsCount > 0 ? ` (${resultsCount})` : null}
    </Button>
  )
}
