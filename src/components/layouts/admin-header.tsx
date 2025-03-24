import { Suspense } from 'react'
import { AdminSearch } from '../admin/search'

export const AdminHeader = () => {
  return (
    <header className="flex h-[60px] items-center gap-4 px-6">
      <div className="grid w-full flex-1 grid-cols-3 items-center gap-4 md:gap-8">
        <div className="col-span-1">
          <Suspense
            fallback={
              <div className="h-9 w-full animate-pulse rounded-md bg-primary-800" />
            }
          >
            <AdminSearch />
          </Suspense>
        </div>
      </div>
    </header>
  )
}
