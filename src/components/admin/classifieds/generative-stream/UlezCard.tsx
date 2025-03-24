import { Skeleton } from '@/components/ui/skeleton'
import { formatUlezCompliance } from '@/lib/utils'
import type { ULEZCompliance } from '@prisma/client'
import { CheckIcon, XIcon } from 'lucide-react'
import type { ReactNode } from 'react'

// UlezCard component specifically for ULEZ compliance
export function UlezCard({
  ulezCompliance,
  done,
}: {
  ulezCompliance: ULEZCompliance | null | undefined
  done: boolean
}) {
  const icon =
    ulezCompliance === 'EXEMPT' ? (
      <CheckIcon className="mx-auto h-6 w-6 text-green-500" />
    ) : (
      <XIcon className="mx-auto h-6 w-6 text-red-500" />
    )

  let content: ReactNode
  if (ulezCompliance) {
    content = (
      <p className="mt-2 font-medium text-sm">
        {formatUlezCompliance(ulezCompliance as ULEZCompliance)}
      </p>
    )
  } else if (done) {
    content = <p className="mt-2 font-medium text-sm">-</p>
  } else {
    content = <Skeleton className="mx-auto mt-2 h-4 w-16" />
  }

  return (
    <div className="rounded-lg bg-gray-100 p-4 text-center shadow-xs">
      {icon}
      {content}
    </div>
  )
}
