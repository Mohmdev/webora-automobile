import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { ButtonHTMLAttributes } from 'react'

interface CloseDialogButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  count?: number
  className?: string
  onClose?: () => void
  label?: string
}

export function CloseDialogButton({
  count = 0,
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
      {count > 0 ? ` (${count})` : null}
    </Button>
  )
}
