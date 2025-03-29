import { SidebarContent, SidebarSeparator } from '@/components/ui/sidebar'
import type { MinMaxProps, SearchAwaitedProps } from '@/types'
import { Block1 } from './block-1'
import { Block2 } from './block-2'
import { Block3 } from './block-3'
import { Block4 } from './block-4'
import { Block5 } from './block-5'

export function PanelBody({
  // Found the bug here
  minMaxValues,
  searchParams,
}: MinMaxProps & SearchAwaitedProps) {
  // const { queryStates, handleChange, handleSelectChange } = useSidebarFilters(
  //   searchParams as Record<string, string>
  // )

  return (
    <SidebarContent className="py-2">
      <Block1 searchParams={searchParams} />

      {/* Filter controls */}
      <Block2 searchParams={searchParams} />
      <SidebarSeparator className="mx-0" />

      {/* Appearance */}
      <Block3 searchParams={searchParams} />
      <SidebarSeparator className="mx-0" />

      {/* Vehicle details */}
      <Block4 searchParams={searchParams} minMaxValues={minMaxValues} />
      <SidebarSeparator className="mx-0" />

      {/* Additional filters */}
      <Block5 searchParams={searchParams} />
    </SidebarContent>
  )
}
