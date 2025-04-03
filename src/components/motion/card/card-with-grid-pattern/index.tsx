import { cn } from '@/lib/utils'
import { motion } from 'motion/react'
import type React from 'react'

interface GridPatternCardProps {
  children: React.ReactNode
  className?: string
  patternClassName?: string
  gradientClassName?: string
}

export function GridPatternCard({
  children,
  className,
  patternClassName,
  gradientClassName,
}: GridPatternCardProps) {
  return (
    <motion.div
      className={cn(
        'w-full overflow-hidden rounded-md border',
        'bg-white dark:bg-zinc-950',
        'border-zinc-200 dark:border-zinc-900',
        className
      )}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <div
        className={cn(
          'size-full bg-[length:50px_50px] bg-repeat',
          'bg-square-pattern-light dark:bg-square-pattern',
          patternClassName
        )}
      >
        <div
          className={cn(
            'size-full bg-gradient-to-tr',
            'from-white via-white/[0.85] to-white',
            'dark:from-zinc-950 dark:via-zinc-950/[.85] dark:to-zinc-950',
            gradientClassName
          )}
        >
          {children}
        </div>
      </div>
    </motion.div>
  )
}

export function GridPatternCardBody({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('p-4 text-left md:p-6', className)} {...props} />
}
