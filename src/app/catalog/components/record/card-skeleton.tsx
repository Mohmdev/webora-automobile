import { cn } from '@/lib/utils'

interface SkeletonCardProps {
  className?: string
}

export function SkeletonCard(props: SkeletonCardProps) {
  const { className } = props
  return (
    <div
      className={cn(
        'aspect-square animate-pulse rounded-xl bg-muted/50 duration-150',
        className
      )}
    />
  )
}
