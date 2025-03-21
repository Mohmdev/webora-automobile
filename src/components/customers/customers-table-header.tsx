"use client"

import { sortOrder } from "@/config/constants"
import type { CustomerKeys, PageProps } from "@/config/types"
import type { Customer } from "@prisma/client"
import { parseAsStringLiteral, useQueryState } from "nuqs"
import { SortIcon } from "../shared/sort-icon"
import { TableHead, TableHeader, TableRow } from "../ui/table"

const customerKeys = [
  "id",
  "email",
  "mobile",
  "firstName",
  "lastName",
  "updatedAt",
  "createdAt",
  "status",
  "bookingDate",
  "classified",
] as const

interface CustomerTableProps extends PageProps {
  customers: Customer[]
  sort: CustomerKeys
  order: "asc" | "desc"
  currentPage: number
  totalPages: number
}

type CustomersTableHeaderProps = Pick<CustomerTableProps, "sort" | "order">

export const CustomersTableHeader = (props: CustomersTableHeaderProps) => {
  const { sort: initialSort, order: initialOrder } = props
  const [sort, setSort] = useQueryState(
    "sort",
    parseAsStringLiteral(customerKeys)
      .withDefault(initialSort)
      .withOptions({ shallow: false })
  )
  const [order, setOrder] = useQueryState(
    "order",
    parseAsStringLiteral(sortOrder)
      .withDefault(initialOrder)
      .withOptions({ shallow: false })
  )

  const handleSort = (newSort: CustomerKeys) => {
    if (newSort === sort) {
      setOrder(order === "asc" ? "desc" : "asc")
    } else {
      setSort(newSort)
      setOrder("asc")
    }
  }

  return (
    <TableHeader>
      <TableRow className="border-primary-800 hover:bg-transparent">
        <TableHead className="w-[80px] text-muted">
          <div
            className="flex cursor-pointer items-center gap-2"
            onClick={() => handleSort("id")}
            onKeyDown={() => handleSort("id")}
          >
            ID
            <SortIcon<CustomerKeys>
              currentSort={sort}
              currentOrder={order as "asc" | "desc" | null}
              sort="id"
            />
          </div>
        </TableHead>
        <TableHead className="w-[150px] text-muted">
          <div
            className="flex cursor-pointer items-center gap-2"
            onClick={() => handleSort("status")}
            onKeyDown={() => handleSort("status")}
          >
            Status
            <SortIcon<CustomerKeys>
              currentSort={sort}
              currentOrder={order as "asc" | "desc" | null}
              sort="status"
            />
          </div>
        </TableHead>
        <TableHead className="w-[150px] text-muted">
          <div
            className="flex cursor-pointer items-center gap-2"
            onClick={() => handleSort("firstName")}
            onKeyDown={() => handleSort("firstName")}
          >
            Name
            <SortIcon<CustomerKeys>
              currentSort={sort}
              currentOrder={order as "asc" | "desc" | null}
              sort="firstName"
            />
          </div>
        </TableHead>
        <TableHead className="w-[150px] text-muted">
          <div
            className="flex cursor-pointer items-center gap-2"
            onClick={() => handleSort("email")}
            onKeyDown={() => handleSort("email")}
          >
            Email
            <SortIcon<CustomerKeys>
              currentSort={sort}
              currentOrder={order as "asc" | "desc" | null}
              sort="email"
            />
          </div>
        </TableHead>
        <TableHead className="w-[150px] text-muted">
          <div
            className="flex cursor-pointer items-center gap-2"
            onClick={() => handleSort("mobile")}
            onKeyDown={() => handleSort("mobile")}
          >
            Mobile
            <SortIcon<CustomerKeys>
              currentSort={sort}
              currentOrder={order as "asc" | "desc" | null}
              sort="mobile"
            />
          </div>
        </TableHead>
        <TableHead className="max-w-[150px] text-muted">Classified</TableHead>
        <TableHead className="hidden text-muted md:table-cell">
          <div
            className="flex cursor-pointer items-center gap-2"
            onClick={() => handleSort("createdAt")}
            onKeyDown={() => handleSort("createdAt")}
          >
            Date Created
            <SortIcon<CustomerKeys>
              currentSort={sort}
              currentOrder={order as "asc" | "desc" | null}
              sort="createdAt"
            />
          </div>
        </TableHead>
        <TableHead className="hidden text-muted md:table-cell">
          <div
            className="flex cursor-pointer items-center gap-2"
            onClick={() => handleSort("updatedAt")}
            onKeyDown={() => handleSort("updatedAt")}
          >
            Date Updated
            <SortIcon<CustomerKeys>
              currentSort={sort}
              currentOrder={order as "asc" | "desc" | null}
              sort="updatedAt"
            />
          </div>
        </TableHead>
        <TableHead className="text-muted">
          <div
            className="flex cursor-pointer items-center gap-2"
            onClick={() => handleSort("bookingDate")}
            onKeyDown={() => handleSort("bookingDate")}
          >
            Booking Date
            <SortIcon<CustomerKeys>
              currentSort={sort}
              currentOrder={order as "asc" | "desc" | null}
              sort="bookingDate"
            />
          </div>
        </TableHead>
        <TableHead className="w-[100px] text-muted">Actions</TableHead>
      </TableRow>
    </TableHeader>
  )
}
