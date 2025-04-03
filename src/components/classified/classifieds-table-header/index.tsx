'use client'

import { sortOrder } from '@/config/constants'
import type { ClassifiedKeys, PromisedParams } from '@/types'
import type { Classified } from '@prisma/client'
import { parseAsStringLiteral, useQueryState } from 'nuqs'
import { TableHeader, TableRow } from '../../ui/table'
import { columns } from './columns'
import { SortableColumn } from './sortable-coulmn'
import { StaticColumn } from './static-coulmn'

const classifiedKeys = [
  'status',
  'title',
  'vrm',
  'id',
  'views',
  'year',
  'colour',
  'price',
  'createdAt',
] as const

interface ClassifiedTableProps extends PromisedParams {
  classifieds: Classified[]
  sort: ClassifiedKeys
  order: 'asc' | 'desc'
  currentPage: number
  totalPages: number
}

type ClassifiedsTableHeaderProps = Pick<ClassifiedTableProps, 'sort' | 'order'>

export function ClassifiedsTableHeader(props: ClassifiedsTableHeaderProps) {
  const { sort: initialSort, order: initialOrder } = props
  const [sort, setSort] = useQueryState(
    'sort',
    parseAsStringLiteral(classifiedKeys)
      .withDefault(initialSort)
      .withOptions({ shallow: false })
  )
  const [order, setOrder] = useQueryState(
    'order',
    parseAsStringLiteral(sortOrder)
      .withDefault(initialOrder)
      .withOptions({ shallow: false })
  )

  const handleSort = (newSort: ClassifiedKeys) => {
    if (newSort === sort) {
      setOrder(order === 'asc' ? 'desc' : 'asc')
    } else {
      setSort(newSort)
      setOrder('asc')
    }
  }

  return (
    <TableHeader>
      <TableRow className="border-primary-800 hover:bg-transparent">
        {columns.map((column, index) => {
          // Skip rendering if this is a duplicate column (like title appearing twice)
          const isDuplicate =
            index > 0 &&
            columns.findIndex((c) => c.key === column.key && !c.isImage) <
              index &&
            !column.isImage

          if (isDuplicate) {
            return null
          }

          return column.isImage ? (
            <StaticColumn
              key={`${column.key}-${index}`}
              title={column.title}
              width={column.width}
              hiddenOnMobile={column.hiddenOnMobile}
            />
          ) : (
            <SortableColumn
              key={`${column.key}-${index}`}
              title={column.title}
              sortKey={column.key}
              currentSort={sort}
              currentOrder={order as 'asc' | 'desc' | null}
              onSort={handleSort}
              width={column.width}
              hiddenOnMobile={column.hiddenOnMobile}
            />
          )
        })}
      </TableRow>
    </TableHeader>
  )
}
