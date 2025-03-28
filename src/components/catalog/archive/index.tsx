import { FiltersPanel } from '@/components/catalog/archive/filters-panel'
import { SidebarProvider } from '@/components/ui/sidebar'
import type { ArchiveProps, SidebarProps } from '@/types'
import { ContentPanel } from './content-panel'

export function Archive({
  searchParams,
  classifieds,
  favourites,
  minMaxValues = {
    _min: { year: 0, price: 0, odoReading: 0 },
    _max: { year: 0, price: 0, odoReading: 0 },
  },
  user,
}: ArchiveProps & SidebarProps) {
  return (
    <SidebarProvider>
      <FiltersPanel
        template="panel-2"
        user={user}
        minMaxValues={minMaxValues}
        searchParams={searchParams}
      />
      <ContentPanel
        template="panel-2"
        classifieds={classifieds}
        favourites={favourites}
      />
    </SidebarProvider>
  )
}
