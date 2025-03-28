import { RadioFilter } from '@/components/shared/radio-filter'
import type { SearchAwaitedProps } from '@/types'
import { CustomerStatus } from '@prisma/client'

export const AdminCustomersHeader = ({ searchParams }: SearchAwaitedProps) => {
  return (
    <div className="flex flex-col space-y-4 p-6 text-muted">
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-lg md:text-2xl">All Customers</h1>
        <div className="flex items-center justify-between">
          <RadioFilter
            items={['ALL', ...Object.values(CustomerStatus)]}
            searchParams={searchParams}
          />
        </div>
      </div>
    </div>
  )
}
