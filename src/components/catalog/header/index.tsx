'use client'

import { getResultsCount } from '@/_data/catalog'
import { ClearFilters } from '@/components/filters/clear-filters'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'
import type { ParamsAwaitedProps } from '@/types'
import { useQuery } from '@tanstack/react-query'

export function Header({
  searchParams,
  className,
}: ParamsAwaitedProps & { className?: string }) {
  const { data: resultsCount } = useQuery({
    queryKey: ['resultsCount', searchParams],
    queryFn: () => getResultsCount(searchParams),
  })

  return (
    <header
      className={cn(
        'sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4',
        className
      )}
    >
      <SidebarTrigger className="-ml-1" />
      <Separator
        orientation="vertical"
        className="mr-2 data-[orientation=vertical]:h-4"
      />
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage>
              {resultsCount && resultsCount > 0
                ? `${resultsCount} Vehicles`
                : 'Vehicles'}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <ClearFilters
        searchParams={searchParams}
        look="nonpersistent"
        className="mr-0 ml-auto h-full"
      />
    </header>
  )
}
