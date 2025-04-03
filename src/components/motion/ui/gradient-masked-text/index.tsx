'use client'

import { cn } from '@/lib/utils'
import { type MotionProps, motion } from 'motion/react'
import type React from 'react'

interface GradientMaskedTextProps
  extends Omit<React.HTMLAttributes<HTMLElement>, keyof MotionProps> {
  className?: string
  children: React.ReactNode
  as?: React.ElementType
}

function GradientMaskedText({
  className,
  children,
  as: Component = 'span',
  ...props
}: GradientMaskedTextProps) {
  const MotionComponent = motion.create(Component)

  return (
    <MotionComponent
      className={cn(
        'relative inline-flex overflow-hidden bg-white dark:bg-black',
        className
      )}
      {...props}
    >
      {children}
      <span className="pointer-events-none absolute inset-0 mix-blend-lighten dark:mix-blend-darken">
        <span className="-top-1/2 pointer-events-none absolute h-[30vw] w-[30vw] animate-[gradient-border_6s_ease-in-out_infinite,gradient-1_12s_ease-in-out_infinite_alternate] bg-[hsl(var(--color-1))] mix-blend-overlay blur-[1rem]" />
        <span className="pointer-events-none absolute top-0 right-0 h-[30vw] w-[30vw] animate-[gradient-border_6s_ease-in-out_infinite,gradient-2_12s_ease-in-out_infinite_alternate] bg-[hsl(var(--color-2))] mix-blend-overlay blur-[1rem]" />
        <span className="pointer-events-none absolute bottom-0 left-0 h-[30vw] w-[30vw] animate-[gradient-border_6s_ease-in-out_infinite,gradient-3_12s_ease-in-out_infinite_alternate] bg-[hsl(var(--color-3))] mix-blend-overlay blur-[1rem]" />
        <span className="-bottom-1/2 pointer-events-none absolute right-0 h-[30vw] w-[30vw] animate-[gradient-border_6s_ease-in-out_infinite,gradient-4_12s_ease-in-out_infinite_alternate] bg-[hsl(var(--color-4))] mix-blend-overlay blur-[1rem]" />
      </span>
    </MotionComponent>
  )
}

export { GradientMaskedText }
