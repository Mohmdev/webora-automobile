import { cn } from '@/lib/utils'

// Using a subset of RecordProps since skeleton doesn't need all the data
interface SkeletonCardProps {
  className?: string
}

export function SkeletonCard(props: SkeletonCardProps) {
  const { className } = props
  return (
    <div
      className={cn(
        'flex flex-col overflow-hidden rounded-md bg-white shadow-md',
        className
      )}
    >
      <div className="relative aspect-3/2 animate-pulse bg-muted/50" />
      <div className="flex flex-col gap-3 p-4">
        <div className="space-y-2">
          <div className="h-6 w-3/4 animate-pulse rounded bg-muted/50" />
          <div className="h-4 w-full animate-pulse rounded bg-muted/50" />
          <div className="h-4 w-full animate-pulse rounded bg-muted/50" />
          <div className="mt-2 flex flex-wrap gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-5 w-16 animate-pulse rounded bg-muted/50"
              />
            ))}
          </div>
        </div>
        <div className="mt-2 flex gap-2">
          <div className="h-9 w-full animate-pulse rounded bg-muted/50" />
          <div className="h-9 w-full animate-pulse rounded bg-muted/50" />
        </div>
      </div>
    </div>
  )
}
