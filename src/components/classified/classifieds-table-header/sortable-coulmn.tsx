import type { ClassifiedKeys } from '@/types'
import { SortIcon } from '../../shared/sort-icon'
import { TableHead } from '../../ui/table'

interface SortableColumnProps {
  title: string
  sortKey: ClassifiedKeys
  currentSort: ClassifiedKeys
  currentOrder: 'asc' | 'desc' | null
  onSort: (sortKey: ClassifiedKeys) => void
  width?: string | undefined
  hiddenOnMobile?: boolean | undefined
}

export function SortableColumn({
  title,
  sortKey,
  currentSort,
  currentOrder,
  onSort,
  width,
  hiddenOnMobile,
}: SortableColumnProps) {
  // Calculate sort direction text
  let sortDirectionText = 'ascending'
  if (currentSort === sortKey && currentOrder === 'asc') {
    sortDirectionText = 'descending'
  }

  return (
    <TableHead
      className={`${width || ''} ${hiddenOnMobile ? 'hidden md:table-cell' : ''} text-muted`}
    >
      <button
        type="button"
        className="flex items-center gap-2"
        onClick={() => onSort(sortKey)}
        aria-label={`Sort by ${title} ${sortDirectionText}`}
      >
        {title}
        <SortIcon<ClassifiedKeys>
          currentSort={currentSort}
          currentOrder={currentOrder}
          sort={sortKey}
        />
      </button>
    </TableHead>
  )
}
