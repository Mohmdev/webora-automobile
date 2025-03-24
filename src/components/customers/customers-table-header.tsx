'use client'

import { sortOrder } from '@/config/constants'
import type { CustomerKeys, PageProps } from '@/config/types'
import type { Customer } from '@prisma/client'
import { parseAsStringLiteral, useQueryState } from 'nuqs'
import { SortIcon } from '../shared/sort-icon'
import { TableHead, TableHeader, TableRow } from '../ui/table'

const customerKeys = [
  'id',
  'email',
  'mobile',
  'firstName',
  'lastName',
  'updatedAt',
  'createdAt',
  'status',
  'bookingDate',
  'classified',
] as const

interface CustomerTableProps extends PageProps {
  customers: Customer[]
  sort: CustomerKeys
  order: 'asc' | 'desc'
  currentPage: number
  totalPages: number
}

type CustomersTableHeaderProps = Pick<CustomerTableProps, 'sort' | 'order'>

export const CustomersTableHeader = (props: CustomersTableHeaderProps) => {
  const { sort: initialSort, order: initialOrder } = props
  const [sort, setSort] = useQueryState(
    'sort',
    parseAsStringLiteral(customerKeys)
      .withDefault(initialSort)
      .withOptions({ shallow: false })
  )
  const [order, setOrder] = useQueryState(
    'order',
    parseAsStringLiteral(sortOrder)
      .withDefault(initialOrder)
      .withOptions({ shallow: false })
  )

  const handleSort = (newSort: CustomerKeys) => {
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
            <SortIcon<CustomerKeys>
              currentSort={sort}
              currentOrder={order as 'asc' | 'desc' | null}
              sort="id"
            />
          </button>
        </TableHead>
        <TableHead className="w-[150px] text-muted">
          <button
            type="button"
            className="flex items-center gap-2"
            onClick={() => handleSort('status')}
            aria-label={`Sort by Status ${sort === 'status' ? (order === 'asc' ? 'descending' : 'ascending') : 'ascending'}`}
          >
            Status
            <SortIcon<CustomerKeys>
              currentSort={sort}
              currentOrder={order as 'asc' | 'desc' | null}
              sort="status"
            />
          </button>
        </TableHead>
        <TableHead className="w-[150px] text-muted">
          <button
            type="button"
            className="flex items-center gap-2"
            onClick={() => handleSort('firstName')}
            aria-label={`Sort by Name ${sort === 'firstName' ? (order === 'asc' ? 'descending' : 'ascending') : 'ascending'}`}
          >
            Name
            <SortIcon<CustomerKeys>
              currentSort={sort}
              currentOrder={order as 'asc' | 'desc' | null}
              sort="firstName"
            />
          </button>
        </TableHead>
        <TableHead className="w-[150px] text-muted">
          <button
            type="button"
            className="flex items-center gap-2"
            onClick={() => handleSort('email')}
            aria-label={`Sort by Email ${sort === 'email' ? (order === 'asc' ? 'descending' : 'ascending') : 'ascending'}`}
          >
            Email
            <SortIcon<CustomerKeys>
              currentSort={sort}
              currentOrder={order as 'asc' | 'desc' | null}
              sort="email"
            />
          </button>
        </TableHead>
        <TableHead className="w-[150px] text-muted">
          <button
            type="button"
            className="flex items-center gap-2"
            onClick={() => handleSort('mobile')}
            aria-label={`Sort by Mobile ${sort === 'mobile' ? (order === 'asc' ? 'descending' : 'ascending') : 'ascending'}`}
          >
            Mobile
            <SortIcon<CustomerKeys>
              currentSort={sort}
              currentOrder={order as 'asc' | 'desc' | null}
              sort="mobile"
            />
          </button>
        </TableHead>
        <TableHead className="max-w-[150px] text-muted">Classified</TableHead>
        <TableHead className="hidden text-muted md:table-cell">
          <button
            type="button"
            className="flex items-center gap-2"
            onClick={() => handleSort('createdAt')}
            aria-label={`Sort by Date Created ${sort === 'createdAt' ? (order === 'asc' ? 'descending' : 'ascending') : 'ascending'}`}
          >
            Date Created
            <SortIcon<CustomerKeys>
              currentSort={sort}
              currentOrder={order as 'asc' | 'desc' | null}
              sort="createdAt"
            />
          </button>
        </TableHead>
        <TableHead className="hidden text-muted md:table-cell">
          <button
            type="button"
            className="flex items-center gap-2"
            onClick={() => handleSort('updatedAt')}
            aria-label={`Sort by Date Updated ${sort === 'updatedAt' ? (order === 'asc' ? 'descending' : 'ascending') : 'ascending'}`}
          >
            Date Updated
            <SortIcon<CustomerKeys>
              currentSort={sort}
              currentOrder={order as 'asc' | 'desc' | null}
              sort="updatedAt"
            />
          </button>
        </TableHead>
        <TableHead className="text-muted">
          <button
            type="button"
            className="flex items-center gap-2"
            onClick={() => handleSort('bookingDate')}
            aria-label={`Sort by Booking Date ${sort === 'bookingDate' ? (order === 'asc' ? 'descending' : 'ascending') : 'ascending'}`}
          >
            Booking Date
            <SortIcon<CustomerKeys>
              currentSort={sort}
              currentOrder={order as 'asc' | 'desc' | null}
              sort="bookingDate"
            />
          </button>
        </TableHead>
        <TableHead className="w-[100px] text-muted">Actions</TableHead>
      </TableRow>
    </TableHeader>
  )
}
