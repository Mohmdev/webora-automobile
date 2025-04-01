import {
  FuelTypeFilter,
  UlezComplianceFilter,
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

export function Block5({
  searchParams,
  className,
}: ParamsAwaitedProps & { className?: string }) {
  return (
    <SidebarGroup>
      <Collapsible
        defaultOpen={false}
        className={cn('group/collapsible', className)}
      >
        <SidebarGroupLabel
          asChild
          className="group/label w-full text-sidebar-foreground text-sm hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
          <CollapsibleTrigger>
            Additional filters
            <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
          </CollapsibleTrigger>
        </SidebarGroupLabel>
        <CollapsibleContent>
          <SidebarGroupContent>
            {/*  */}
            <div className="flex flex-row flex-nowrap items-center justify-between gap-2">
              <FuelTypeFilter searchParams={searchParams} />
              <UlezComplianceFilter searchParams={searchParams} />
            </div>
            {/*  */}
            <div className="flex flex-row flex-nowrap items-center justify-between gap-2">
              {/*  */}
            </div>
          </SidebarGroupContent>
        </CollapsibleContent>
      </Collapsible>
    </SidebarGroup>
  )
}
