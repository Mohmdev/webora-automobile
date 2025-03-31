import { ListRecords } from '@/components/catalog/list'
import { SidebarInset } from '@/components/ui/sidebar'
import type { QueryReturnMetaProps } from '@/data/catalog'
import type { FavouritesProps, ParamsAwaitedProps } from '@/types'
import { Header } from '../../header'

export function ContentPanel2({
  favouriteIds,
  className,
  searchParams,
}: FavouritesProps &
  ParamsAwaitedProps &
  QueryReturnMetaProps & { className?: string }) {
  return (
    <SidebarInset className={className}>
      <Header
        className="z-20 border-border/70 bg-background/70 backdrop-blur-md"
        searchParams={searchParams}
      />
      <div className="z-10 flex flex-1 flex-col gap-4 p-4">
        <ListRecords
          template="grid-2"
          favouriteIds={favouriteIds}
          searchParams={searchParams}
        />
      </div>
    </SidebarInset>
  )
}
