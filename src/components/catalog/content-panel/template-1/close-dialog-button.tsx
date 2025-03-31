import { getResultsCount } from '@/_data/catalog'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { ParamsAwaitedProps } from '@/types'
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
}: CloseDialogButtonProps & ParamsAwaitedProps) {
  const { data: resultsCount } = useQuery({
    queryKey: ['resultsCount', searchParams],
    queryFn: () => getResultsCount(searchParams),
  })

  return (
    <Button
      type="button"
      onClick={onClose}
      className={cn('w-full', className)}
      {...props}
    >
      {label}
      {resultsCount && resultsCount > 0 ? ` (${resultsCount})` : null}
    </Button>
  )
}
