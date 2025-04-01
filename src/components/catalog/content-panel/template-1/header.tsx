'use client'

import { fetchRecordsCount } from '@/_data'
import { cn } from '@/lib/utils'
import type { ParamsAwaitedProps } from '@/types'
import { useQuery } from '@tanstack/react-query'
import { FiltersDialog } from './filters-dialog'

export function Header({
  searchParams,
  className,
}: ParamsAwaitedProps & { className?: string }) {
  const {
    data: { count } = { count: 0 },
  } = useQuery({
    queryKey: ['recordsCount', searchParams],
    queryFn: () => fetchRecordsCount(searchParams),
  })

  return (
    <div className={cn('flex w-full items-center justify-between', className)}>
      <h2 className="min-w-fit font-semibold text-sm md:text-base lg:text-xl">
        We have found {count} classifieds
      </h2>
      {/* Mobile filters dialog */}
      <FiltersDialog searchParams={searchParams} className="lg:hidden" />
    </div>
  )
}
