import { Button, type ButtonProps } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'

export function RecordCTA({
  href,
  label,
  isPrimary = false,
  className,
  ...props
}: ButtonProps & { href: string; label: string; isPrimary?: boolean }) {
  return (
    <Button
      className={cn(
        'flex-1 font-heading text-xs md:text-sm',
        isPrimary
          ? ''
          : 'transition-colors hover:border-white hover:bg-primary hover:text-white',
        className
      )}
      asChild
      variant={isPrimary ? 'default' : 'outline'}
      size="sm"
      {...props}
    >
      <Link href={href}>{label}</Link>
    </Button>
  )
}
