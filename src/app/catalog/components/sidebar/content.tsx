import { Calendars } from '@/app/catalog/components/_sub/calendars'
import {
  SidebarContent as SidebarContentComponent,
  SidebarSeparator,
} from '@/components/ui/sidebar'
import { DatePicker } from '../_sub/date-picker'

interface SidebarContentProps {
  data?: {
    name: string
    items: string[]
  }[]
}

export function SidebarContent({ data }: SidebarContentProps) {
  return (
    <SidebarContentComponent>
      <DatePicker />
      <SidebarSeparator className="mx-0" />
      <Calendars calendars={data ?? []} />
    </SidebarContentComponent>
  )
}
