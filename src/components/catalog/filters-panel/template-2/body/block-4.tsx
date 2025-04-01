import {
  FuelTypeFilter,
  TransmissionFilter,
  YearFilter,
} from '@/components/filters/render-filters'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'
import type { ParamsAwaitedProps } from '@/types'
import { ChevronRight } from 'lucide-react'

export function Block4({
  searchParams,
  className,
}: ParamsAwaitedProps & { className?: string }) {
  return (
    <SidebarGroup className={cn(className)}>
      <Collapsible defaultOpen={true} className="group/collapsible">
        <SidebarGroupLabel
          asChild
          className="group/label w-full text-sidebar-foreground text-sm hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
          <CollapsibleTrigger>
            Vehicle details
            <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
          </CollapsibleTrigger>
        </SidebarGroupLabel>
        <CollapsibleContent>
          <SidebarGroupContent>
            <YearFilter searchParams={searchParams} />

            <div className="flex flex-row flex-nowrap items-center justify-between gap-2">
              <FuelTypeFilter searchParams={searchParams} />
              <TransmissionFilter searchParams={searchParams} />
            </div>

            <div className="flex flex-row flex-nowrap items-center justify-between gap-2">
              {/*  */}
            </div>
          </SidebarGroupContent>
        </CollapsibleContent>
      </Collapsible>
    </SidebarGroup>
  )
}
