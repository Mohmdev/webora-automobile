'use client'

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible-stack'
import { cn } from '@/lib/utils'
import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'

interface CollapsibleFiltersStackProps {
  triggerLabel?: string
  icon?: LucideIcon
  children: ReactNode
  defaultOpen?: boolean
  noCollapsible?: boolean
  className?: string
  triggerClassName?: string
}

export function CollapsibleFiltersStack({
  triggerLabel,
  icon,
  children,
  defaultOpen = false,
  noCollapsible = false,
  className,
  triggerClassName,
}: CollapsibleFiltersStackProps) {
  if (noCollapsible) {
    return (
      <Collapsible defaultOpen={true} className="space-y-2">
        {/* <CollapsibleTrigger icon={icon} className={cn('py-1', className)} /> */}
        <CollapsibleContent className={cn('pt-1 pb-2', className)}>
          {children}
        </CollapsibleContent>
      </Collapsible>
    )
  }

  return (
    <Collapsible defaultOpen={defaultOpen} className="space-y-2">
      <CollapsibleTrigger
        triggerLabel={triggerLabel}
        icon={icon}
        className={cn('px-2 py-1', triggerClassName)}
      />
      {/* <SidebarSeparator className="mx-0" /> */}
      <CollapsibleContent
        className={cn(
          'border-border/100 border-t pt-1 pb-2 data-[state=open]:border-border/0',
          className
        )}
      >
        {children}
      </CollapsibleContent>
    </Collapsible>
  )
}
