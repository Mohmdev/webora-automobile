import { cn } from '@/lib/utils'
import { motion } from 'motion/react'
import type React from 'react'

interface DiagonalLinesPatternCardProps {
  children: React.ReactNode
  className?: string
  patternClassName?: string
  gradientClassName?: string
}

export function DiagonalLinesPatternCard({
  children,
  className,
  patternClassName,
  gradientClassName,
}: DiagonalLinesPatternCardProps) {
  return (
    <motion.div
      className={cn(
        'w-full overflow-hidden rounded-md border',
        'bg-background',
        'border-border',
        'p-3',
        className
      )}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <div
        className={cn(
          'size-full bg-[length:30px_30px] bg-repeat',
          'bg-lines-pattern-light dark:bg-lines-pattern',
          patternClassName
        )}
      >
        <div
          className={cn(
            'size-full bg-gradient-to-tr',
            'from-background/90 via-background/40 to-background/10',
            gradientClassName
          )}
        >
          {children}
        </div>
      </div>
    </motion.div>
  )
}

export function DiagonalLinesPatternCardBody({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('p-4 text-left md:p-6', className)} {...props} />
}
