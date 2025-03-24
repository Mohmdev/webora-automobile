import { Skeleton } from '@/components/ui/skeleton'
import type { ElementType, ReactNode } from 'react'
// Define value types - using unknown instead of any for better type safety
type ValueType = string | number | null | undefined

// InfoCard component to display vehicle info with icon
export function InfoCard({
  icon: Icon,
  value,
  formatter,
  done,
}: {
  icon: ElementType
  value?: ValueType
  formatter?: ((val: unknown) => string) | undefined
  done: boolean
}) {
  let content: ReactNode
  if (value) {
    content = (
      <p className="mt-2 font-medium text-sm">
        {formatter ? formatter(value) : String(value)}
      </p>
    )
  } else if (done) {
    content = <p className="mt-2 font-medium text-sm">-</p>
  } else {
    content = <Skeleton className="mx-auto mt-2 h-4 w-16" />
  }

  return (
    <div className="rounded-lg bg-gray-100 p-4 text-center shadow-xs">
      <Icon className="mx-auto h-6 w-6 text-zinc-400" />
      {content}
    </div>
  )
}
