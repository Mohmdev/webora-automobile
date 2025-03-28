import { ListRecords } from '@/components/catalog/list'
import { SidebarInset } from '@/components/ui/sidebar'
import type { ArchiveProps } from '@/types'
import { Header } from '../../header'

export function ContentPanel2({ classifieds, favourites }: ArchiveProps) {
  return (
    <SidebarInset>
      <Header className="z-20 border-border/70 bg-background/70 backdrop-blur-md" />
      <div className="z-10 flex flex-1 flex-col gap-4 p-4">
        <ListRecords
          template="grid-2"
          classifieds={classifieds}
          favourites={favourites}
        />
      </div>
    </SidebarInset>
  )
}
