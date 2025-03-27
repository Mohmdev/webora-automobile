import { AppSidebar } from '@/app/catalog/components/sidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import type { ClassifiedWithImages, SidebarProps } from '@/config/types'
import { ListRecords } from '../list'
import { Header } from './header'

export type ArchiveProps = {
  classifieds: Promise<ClassifiedWithImages[]>
  favourites: number[]
}

export function Archive({
  classifieds,
  favourites,
  minMaxValues = {
    _min: { year: 0, price: 0, odoReading: 0 },
    _max: { year: 0, price: 0, odoReading: 0 },
  },
  searchParams,
}: ArchiveProps & SidebarProps) {
  return (
    <SidebarProvider>
      <AppSidebar minMaxValues={minMaxValues} searchParams={searchParams} />
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
    </SidebarProvider>
  )
}
