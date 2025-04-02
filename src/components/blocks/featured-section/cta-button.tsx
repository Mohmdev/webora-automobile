import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import type React from 'react'

export function CTAButton({
  label,
  href,
  variant = 'shine',
  radius = 'xl',
  className,
}: {
  label: string
  href: string
  variant: 'shine' | 'ghost'
  radius?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  className?: string
}) {
  switch (variant) {
    case 'shine':
      return (
        <ShinyButton
          label={label}
          href={href}
          className={className}
          radius={radius}
        />
      )
    case 'ghost':
      return (
        <GhostButton
          label={label}
          href={href}
          className={className}
          radius={radius}
        />
      )
    default:
      return null
  }
}

const GhostButton: React.FC<{
  label: string
  href: string
  radius?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  className?: string
}> = ({
  label = 'Request a demo',
  href = '#link',
  className,
  radius = 'xl',
}) => {
  return (
    <Button
      asChild
      size="lg"
      variant="ghost"
      className={cn(
        'h-10.5 px-5 text-base',
        radius === 'sm' && 'rounded-sm',
        radius === 'md' && 'rounded-md',
        radius === 'lg' && 'rounded-lg',
        radius === 'xl' && 'rounded-xl',
        radius === 'full' && 'rounded-full',
        className
      )}
    >
      <Link href={href}>
        <span className="text-nowrap">{label}</span>
      </Link>
    </Button>
  )
}

const ShinyButton: React.FC<{
  label: string
  href: string
  radius?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  className?: string
}> = ({
  label = 'Start Building',
  href = '#link',
  className,
  radius = 'xl',
}) => {
  return (
    <div
      className={cn(
        'border bg-foreground/10 p-0.5',
        radius === 'sm' && 'rounded-[calc(var(--radius-sm)+0.050rem)]',
        radius === 'md' && 'rounded-[calc(var(--radius-md)+0.075rem)]',
        radius === 'lg' && 'rounded-[calc(var(--radius-lg)+0.100rem)]',
        radius === 'xl' && 'rounded-[calc(var(--radius-xl)+0.125rem)]',
        radius === 'full' && 'rounded-[calc(var(--radius-full)+0.150rem)]',
        className
      )}
    >
      <Button asChild size="lg" className="rounded-[inherit] px-5 text-base">
        <Link href={href}>
          <span className="text-nowrap">{label}</span>
        </Link>
      </Button>
    </div>
  )
}
