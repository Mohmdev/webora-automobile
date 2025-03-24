'use client'

import type { CustomerKeys, PageProps } from '@/config/types'
import type { Customer } from '@prisma/client'
import { TableHeader, TableRow } from '../../ui/table'
import { StaticTableHead } from './static-table-head'
import { TableHeadButton } from './table-head-button'
import { useCustomerSorting } from './use-customer-sorting'

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
  const { sort, order, handleSort } = useCustomerSorting({
    initialSort,
    initialOrder,
  })

  return (
    <TableHeader>
      <TableRow className="border-primary-800 hover:bg-transparent">
        <TableHeadButton
          label="ID"
          sortKey="id"
          currentSort={sort}
          currentOrder={order}
          onSort={handleSort}
          width="w-[80px]"
        />

        <TableHeadButton
          label="Status"
          sortKey="status"
          currentSort={sort}
          currentOrder={order}
          onSort={handleSort}
          width="w-[150px]"
        />

        <TableHeadButton
          label="Name"
          sortKey="firstName"
          currentSort={sort}
          currentOrder={order}
          onSort={handleSort}
          width="w-[150px]"
        />

        <TableHeadButton
          label="Email"
          sortKey="email"
          currentSort={sort}
          currentOrder={order}
          onSort={handleSort}
          width="w-[150px]"
        />

        <TableHeadButton
          label="Mobile"
          sortKey="mobile"
          currentSort={sort}
          currentOrder={order}
          onSort={handleSort}
          width="w-[150px]"
        />

        <StaticTableHead label="Classified" width="max-w-[150px]" />

        <TableHeadButton
          label="Date Created"
          sortKey="createdAt"
          currentSort={sort}
          currentOrder={order}
          onSort={handleSort}
          hidden={true}
        />

        <TableHeadButton
          label="Date Updated"
          sortKey="updatedAt"
          currentSort={sort}
          currentOrder={order}
          onSort={handleSort}
          hidden={true}
        />

        <TableHeadButton
          label="Booking Date"
          sortKey="bookingDate"
          currentSort={sort}
          currentOrder={order}
          onSort={handleSort}
        />

        <StaticTableHead label="Actions" width="w-[100px]" />
      </TableRow>
    </TableHeader>
  )
}
