"use client"

import { sortOrder } from "@/config/constants"
import type { ClassifiedKeys, PageProps } from "@/config/types"
import type { Classified } from "@prisma/client"
import { parseAsStringLiteral, useQueryState } from "nuqs"
import { SortIcon } from "../shared/sort-icon"
import { TableHead, TableHeader, TableRow } from "../ui/table"

const classifiedKeys = [
  "status",
  "title",
  "vrm",
  "id",
  "views",
  "year",
  "colour",
  "price",
  "createdAt",
] as const

interface ClassifiedTableProps extends PageProps {
  classifieds: Classified[]
  sort: ClassifiedKeys
  order: "asc" | "desc"
  currentPage: number
  totalPages: number
}

type ClassifiedsTableHeaderProps = Pick<ClassifiedTableProps, "sort" | "order">

export const ClassifiedsTableHeader = (props: ClassifiedsTableHeaderProps) => {
  const { sort: initialSort, order: initialOrder } = props
  const [sort, setSort] = useQueryState(
    "sort",
    parseAsStringLiteral(classifiedKeys)
      .withDefault(initialSort)
      .withOptions({ shallow: false })
  )
  const [order, setOrder] = useQueryState(
    "order",
    parseAsStringLiteral(sortOrder)
      .withDefault(initialOrder)
      .withOptions({ shallow: false })
  )

  const handleSort = (newSort: ClassifiedKeys) => {
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
            <SortIcon<ClassifiedKeys>
              currentSort={sort}
              currentOrder={order as "asc" | "desc" | null}
              sort="id"
            />
          </div>
        </TableHead>
        <TableHead className="w-[80px] text-muted">Image</TableHead>
        <TableHead className="w-[150px] text-muted">
          <div
            className="flex cursor-pointer items-center gap-2"
            onClick={() => handleSort("title")}
            onKeyDown={() => handleSort("title")}
          >
            Title
            <SortIcon<ClassifiedKeys>
              currentSort={sort}
              currentOrder={order as "asc" | "desc" | null}
              sort="title"
            />
          </div>
        </TableHead>
        <TableHead className="w-[150px] text-muted">
          <div
            className="flex cursor-pointer items-center gap-2"
            onClick={() => handleSort("price")}
            onKeyDown={() => handleSort("price")}
          >
            Price
            <SortIcon<ClassifiedKeys>
              currentSort={sort}
              currentOrder={order as "asc" | "desc" | null}
              sort="price"
            />
          </div>
        </TableHead>
        <TableHead className="w-[150px] text-muted">
          <div
            className="flex cursor-pointer items-center gap-2"
            onClick={() => handleSort("vrm")}
            onKeyDown={() => handleSort("vrm")}
          >
            VRM
            <SortIcon<ClassifiedKeys>
              currentSort={sort}
              currentOrder={order as "asc" | "desc" | null}
              sort="vrm"
            />
          </div>
        </TableHead>
        <TableHead className="w-[150px] text-muted">
          <div
            className="flex cursor-pointer items-center gap-2"
            onClick={() => handleSort("colour")}
            onKeyDown={() => handleSort("colour")}
          >
            Colour
            <SortIcon<ClassifiedKeys>
              currentSort={sort}
              currentOrder={order as "asc" | "desc" | null}
              sort="colour"
            />
          </div>
        </TableHead>
        <TableHead className="text-muted">
          <div
            className="flex cursor-pointer items-center gap-2"
            onClick={() => handleSort("status")}
            onKeyDown={() => handleSort("status")}
          >
            Status
            <SortIcon<ClassifiedKeys>
              currentSort={sort}
              currentOrder={order as "asc" | "desc" | null}
              sort="status"
            />
          </div>
        </TableHead>
        <TableHead className="hidden text-muted md:table-cell">
          <div
            className="flex cursor-pointer items-center gap-2"
            onClick={() => handleSort("createdAt")}
            onKeyDown={() => handleSort("createdAt")}
          >
            Date Created
            <SortIcon<ClassifiedKeys>
              currentSort={sort}
              currentOrder={order as "asc" | "desc" | null}
              sort="createdAt"
            />
          </div>
        </TableHead>
        <TableHead className="text-muted">
          <div
            className="flex cursor-pointer items-center gap-2"
            onClick={() => handleSort("views")}
            onKeyDown={() => handleSort("views")}
          >
            Views
            <SortIcon<ClassifiedKeys>
              currentSort={sort}
              currentOrder={order as "asc" | "desc" | null}
              sort="views"
            />
          </div>
        </TableHead>
        <TableHead className="w-[100px] text-muted">Actions</TableHead>
      </TableRow>
    </TableHeader>
  )
}
