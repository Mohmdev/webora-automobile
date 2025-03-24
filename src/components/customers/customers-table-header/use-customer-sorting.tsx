'use client'

import { sortOrder } from '@/config/constants'
import type { CustomerKeys } from '@/config/types'
import { parseAsStringLiteral, useQueryState } from 'nuqs'

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

interface UseCustomerSortingProps {
  initialSort: CustomerKeys
  initialOrder: 'asc' | 'desc'
}

export const useCustomerSorting = ({
  initialSort,
  initialOrder,
}: UseCustomerSortingProps) => {
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

  return {
    sort,
    order: order as 'asc' | 'desc' | null,
    handleSort,
  }
}

export { customerKeys }
