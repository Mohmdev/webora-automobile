import { ClearFilters } from '@/components/filters/clear-filters'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { prisma } from '@/lib/prisma'
import { buildClassifiedFilterQuery, cn } from '@/lib/utils'
import type { SearchAwaitedProps } from '@/types'

export async function Header({
  className,
  searchParams,
}: {
  className?: string
  searchParams: SearchAwaitedProps['searchParams']
}) {
  const resultCount = await prisma.classified.count({
    where: buildClassifiedFilterQuery(searchParams),
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
            <BreadcrumbPage>{resultCount} Vehicles</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <ClearFilters
        searchParams={searchParams}
        className="mr-0 ml-auto h-full"
      />
    </header>
  )
}
