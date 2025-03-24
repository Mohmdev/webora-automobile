import type { CustomerKeys } from '@/config/types'
import { SortIcon } from '../../shared/sort-icon'

interface TableHeadButtonProps {
  label: string
  sortKey: CustomerKeys
  currentSort: CustomerKeys
  currentOrder: 'asc' | 'desc' | null
  onSort: (sortKey: CustomerKeys) => void
  width?: string
  className?: string
  hidden?: boolean
}

export const TableHeadButton = ({
  label,
  sortKey,
  currentSort,
  currentOrder,
  onSort,
  width = '',
  className = '',
  hidden = false,
}: TableHeadButtonProps) => {
  let sortDirection = 'ascending'
  if (currentSort === sortKey && currentOrder === 'asc') {
    sortDirection = 'descending'
  }

  const ariaLabel = `Sort by ${label} ${sortDirection}`

  const baseClass = `${width} text-muted ${hidden ? 'hidden md:table-cell' : ''} ${className}`

  return (
    <th className={baseClass}>
      <button
        type="button"
        className="flex items-center gap-2"
        onClick={() => onSort(sortKey)}
        aria-label={ariaLabel}
      >
        {label}
        <SortIcon<CustomerKeys>
          currentSort={currentSort}
          currentOrder={currentOrder}
          sort={sortKey}
        />
      </button>
    </th>
  )
}
