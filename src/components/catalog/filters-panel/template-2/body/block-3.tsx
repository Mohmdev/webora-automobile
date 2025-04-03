import {
  BodyTypeFilter,
  ColourFilter,
  DoorsFilter,
  SeatsFilter,
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
import type { ResolvedParams } from '@/types'
import { ChevronRight } from 'lucide-react'

export function Block3({
  searchParams,
  className,
}: ResolvedParams & { className?: string }) {
  return (
    <SidebarGroup className={cn(className)}>
      <Collapsible defaultOpen={true} className="group/collapsible">
        <SidebarGroupLabel
          asChild
          className="group/label w-full text-sidebar-foreground text-sm hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
          <CollapsibleTrigger>
            Appearance
            <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
          </CollapsibleTrigger>
        </SidebarGroupLabel>
        <CollapsibleContent>
          <SidebarGroupContent>
            {/*  */}
            <div className="flex flex-row flex-nowrap items-center justify-between gap-2">
              <BodyTypeFilter searchParams={searchParams} />
              <ColourFilter searchParams={searchParams} />
            </div>
            {/*  */}
            <div className="flex flex-row flex-nowrap items-center justify-between gap-2">
              <DoorsFilter searchParams={searchParams} />
              <SeatsFilter searchParams={searchParams} />
            </div>
          </SidebarGroupContent>
        </CollapsibleContent>
      </Collapsible>
    </SidebarGroup>
  )
}
