import { ListRecords } from '@/components/inventory/list'
import { CustomPagination } from '@/components/shared/custom-pagination'
import { routes } from '@/config/routes'
import { cn } from '@/lib/utils'
import type { ResolvedParams } from '@/types'
import { Header } from './header'

export function ContentPanel1({
  className,
  searchParams,
}: ResolvedParams & { className?: string }) {
  return (
    <div className={cn('flex-1 p-4', className)}>
      <div className="-mt-1 flex items-center justify-between space-y-2 pb-4">
        <Header searchParams={searchParams} />
        <CustomPagination
          baseURL={routes.inventory}
          searchParams={searchParams}
          styles={{
            paginationRoot: 'justify-end hidden lg:flex',
            paginationPrevious: '',
            paginationNext: '',
            paginationLink: 'border-none active:border text-foreground',
            paginationLinkActive: '',
          }}
        />
      </div>

      <ListRecords template="grid-1" searchParams={searchParams} />

      <CustomPagination
        baseURL={routes.inventory}
        searchParams={searchParams}
        styles={{
          paginationRoot: 'justify-center lg:hidden pt-12',
          paginationPrevious: '',
          paginationNext: '',
          paginationLink: 'border-none active:border',
          paginationLinkActive: '',
        }}
      />
    </div>
  )
}
