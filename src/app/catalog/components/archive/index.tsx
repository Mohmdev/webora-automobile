import { AppSidebar } from '@/app/catalog/components/sidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import type { ClassifiedWithImages } from '@/config/types'
import { ListRecords } from '../list'
import { Header } from './header'

export interface ArchiveProps {
  classifieds: Promise<ClassifiedWithImages[]>
  favourites: number[]
}

export function Archive({ classifieds, favourites }: ArchiveProps) {
  return (
    <SidebarProvider>
      <AppSidebar />
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
