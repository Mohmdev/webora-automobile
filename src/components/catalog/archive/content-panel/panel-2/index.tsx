import { ListRecords } from '@/components/catalog/list'
import { SidebarInset } from '@/components/ui/sidebar'
import type { ClassifiedsArrayProps, FavouritesProps } from '@/types'
import { Header } from '../../header'

export function ContentPanel2({
  classifiedsArray,
  favouriteIds,
  className,
}: ClassifiedsArrayProps & FavouritesProps & { className?: string }) {
  return (
    <SidebarInset className={className}>
      <Header className="z-20 border-border/70 bg-background/70 backdrop-blur-md" />
      <div className="z-10 flex flex-1 flex-col gap-4 p-4">
        <ListRecords
          template="grid-2"
          classifiedsArray={classifiedsArray}
          favouriteIds={favouriteIds}
        />
      </div>
    </SidebarInset>
  )
}
