import { ClearFilters } from '@/components/filters/clear-filters'

export function PanelHeader({
  searchParams,
}: { searchParams: Record<string, string> }) {
  return (
    <div className="flex justify-between px-4 font-semibold text-lg">
      <span>Filters</span>
      <div className="flex justify-between">
        <ClearFilters searchParams={searchParams} />
      </div>
    </div>
  )
}
