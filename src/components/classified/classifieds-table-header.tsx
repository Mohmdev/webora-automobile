'use client'

import { sortOrder } from '@/config/constants'
import type { ClassifiedKeys, PageProps } from '@/config/types'
import type { Classified } from '@prisma/client'
import { parseAsStringLiteral, useQueryState } from 'nuqs'
import { SortIcon } from '../shared/sort-icon'
import { TableHead, TableHeader, TableRow } from '../ui/table'

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

interface ClassifiedTableProps extends PageProps {
  classifieds: Classified[]
  sort: ClassifiedKeys
  order: 'asc' | 'desc'
  currentPage: number
  totalPages: number
}

type ClassifiedsTableHeaderProps = Pick<ClassifiedTableProps, 'sort' | 'order'>

export const ClassifiedsTableHeader = (props: ClassifiedsTableHeaderProps) => {
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
        <TableHead className="w-[80px] text-muted">
          <button
            type="button"
            className="flex items-center gap-2"
            onClick={() => handleSort('id')}
            aria-label={`Sort by ID ${sort === 'id' ? (order === 'asc' ? 'descending' : 'ascending') : 'ascending'}`}
          >
            ID
            <SortIcon<ClassifiedKeys>
              currentSort={sort}
              currentOrder={order as 'asc' | 'desc' | null}
              sort="id"
            />
          </button>
        </TableHead>
        <TableHead className="w-[80px] text-muted">Image</TableHead>
        <TableHead className="w-[150px] text-muted">
          <button
            type="button"
            className="flex items-center gap-2"
            onClick={() => handleSort('title')}
            aria-label={`Sort by Title ${sort === 'title' ? (order === 'asc' ? 'descending' : 'ascending') : 'ascending'}`}
          >
            Title
            <SortIcon<ClassifiedKeys>
              currentSort={sort}
              currentOrder={order as 'asc' | 'desc' | null}
              sort="title"
            />
          </button>
        </TableHead>
        <TableHead className="w-[150px] text-muted">
          <button
            type="button"
            className="flex items-center gap-2"
            onClick={() => handleSort('price')}
            aria-label={`Sort by Price ${sort === 'price' ? (order === 'asc' ? 'descending' : 'ascending') : 'ascending'}`}
          >
            Price
            <SortIcon<ClassifiedKeys>
              currentSort={sort}
              currentOrder={order as 'asc' | 'desc' | null}
              sort="price"
            />
          </button>
        </TableHead>
        <TableHead className="w-[150px] text-muted">
          <button
            type="button"
            className="flex items-center gap-2"
            onClick={() => handleSort('vrm')}
            aria-label={`Sort by VRM ${sort === 'vrm' ? (order === 'asc' ? 'descending' : 'ascending') : 'ascending'}`}
          >
            VRM
            <SortIcon<ClassifiedKeys>
              currentSort={sort}
              currentOrder={order as 'asc' | 'desc' | null}
              sort="vrm"
            />
          </button>
        </TableHead>
        <TableHead className="w-[150px] text-muted">
          <button
            type="button"
            className="flex items-center gap-2"
            onClick={() => handleSort('colour')}
            aria-label={`Sort by Colour ${sort === 'colour' ? (order === 'asc' ? 'descending' : 'ascending') : 'ascending'}`}
          >
            Colour
            <SortIcon<ClassifiedKeys>
              currentSort={sort}
              currentOrder={order as 'asc' | 'desc' | null}
              sort="colour"
            />
          </button>
        </TableHead>
        <TableHead className="text-muted">
          <button
            type="button"
            className="flex items-center gap-2"
            onClick={() => handleSort('status')}
            aria-label={`Sort by Status ${sort === 'status' ? (order === 'asc' ? 'descending' : 'ascending') : 'ascending'}`}
          >
            Status
            <SortIcon<ClassifiedKeys>
              currentSort={sort}
              currentOrder={order as 'asc' | 'desc' | null}
              sort="status"
            />
          </button>
        </TableHead>
        <TableHead className="hidden text-muted md:table-cell">
          <button
            type="button"
            className="flex items-center gap-2"
            onClick={() => handleSort('createdAt')}
            aria-label={`Sort by Date Created ${sort === 'createdAt' ? (order === 'asc' ? 'descending' : 'ascending') : 'ascending'}`}
          >
            Date Created
            <SortIcon<ClassifiedKeys>
              currentSort={sort}
              currentOrder={order as 'asc' | 'desc' | null}
              sort="createdAt"
            />
          </button>
        </TableHead>
        <TableHead className="text-muted">
          <button
            type="button"
            className="flex items-center gap-2"
            onClick={() => handleSort('views')}
            aria-label={`Sort by Views ${sort === 'views' ? (order === 'asc' ? 'descending' : 'ascending') : 'ascending'}`}
          >
            Views
            <SortIcon<ClassifiedKeys>
              currentSort={sort}
              currentOrder={order as 'asc' | 'desc' | null}
              sort="views"
            />
          </button>
        </TableHead>
        <TableHead className="w-[100px] text-muted">Actions</TableHead>
      </TableRow>
    </TableHeader>
  )
}
