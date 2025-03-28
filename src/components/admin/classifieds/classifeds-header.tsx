import { RadioFilter } from '@/components/shared/radio-filter'
import type { SearchAwaitedProps } from '@/types'
import { ClassifiedStatus } from '@prisma/client'
import { CreateClassifiedDialog } from './create-classified-dialog'

export const AdminClassifiedsHeader = ({
  searchParams,
}: SearchAwaitedProps) => {
  return (
    <div className="flex flex-col space-y-4 p-6 text-muted">
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-lg md:text-2xl">All Classifieds</h1>
        <div className="flex items-center justify-between">
          <RadioFilter
            items={['ALL', ...Object.values(ClassifiedStatus)]}
            searchParams={searchParams}
          />
          <CreateClassifiedDialog />
        </div>
      </div>
    </div>
  )
}
