'use client'

import type { FilterOptions, ParamsAwaitedProps } from '@/types'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { TableCell, TableFooter, TableRow } from '../ui/table'
import { CustomPagination } from './custom-pagination'
const itemsPerPageOptions: FilterOptions<string, string> = [
  { label: '10', value: '10' },
  { label: '25', value: '25' },
  { label: '50', value: '50' },
  { label: '100', value: '100' },
]

type AdminTableFooterProps = ParamsAwaitedProps & {
  disabled: boolean
  totalPages: number
  baseURL: string
  cols: number
}

export const AdminTableFooter = ({
  disabled,
  baseURL,
  cols,
  searchParams,
}: AdminTableFooterProps) => {
  const itemsPerPage = searchParams?.itemsPerPage || '10'
  const router = useRouter()

  const handleItemsPerPage = (value: string) => {
    const currentUrlParams = new URLSearchParams(window.location.search)
    currentUrlParams.set('itemsPerPage', value)
    const url = new URL(window.location.href)
    url.search = currentUrlParams.toString()
    router.push(url.toString())
  }

  useEffect(() => {
    const currentUrlParams = new URLSearchParams(window.location.search)
    currentUrlParams.set('itemsPerPage', itemsPerPage as string)
    const url = new URL(window.location.href)
    url.search = currentUrlParams.toString()
    router.push(url.toString())
  }, [router, itemsPerPage])

  return (
    <TableFooter className="border-primary-800 hover:bg-transparent">
      <TableRow className="bg-primary-900 hover:bg-transparent">
        <TableCell colSpan={cols}>
          <div className="flex items-center">
            <Select
              disabled={disabled}
              value={(searchParams?.itemsPerPage as string) || '10'}
              onValueChange={handleItemsPerPage}
            >
              <SelectTrigger className="w-[100px] border-primary-800 bg-primary-800 text-muted/75">
                <SelectValue placeholder="Items" />
              </SelectTrigger>
              <SelectContent>
                {itemsPerPageOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <CustomPagination
              searchParams={searchParams}
              baseURL={baseURL}
              styles={{
                paginationRoot: 'justify-end',
                paginationPrevious:
                  'border-none hover:bg-primary-800 text-muted',
                paginationNext: 'hover:bg-primary-800 text-muted',
                paginationLink: 'border-none hover:bg-primary-800 text-muted',
                paginationLinkActive: 'bg-primary-800 !text-white',
              }}
            />
          </div>
        </TableCell>
      </TableRow>
    </TableFooter>
  )
}
