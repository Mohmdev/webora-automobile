import { prisma } from '@/lib/prisma'
import { validatePagination } from '@/schemas/pagination.schema'
import { AdminCustomerFilterSchema } from '@/schemas/table-filters.schema'
import {
  CustomersTableSortSchema,
  type CustomersTableSortType,
  validateSortOrder,
} from '@/schemas/table-sort.schema'
import type { CustomerKeys, ResolvedParams } from '@/types'

/**
 * Fetches customers with pagination, sorting, and filtering capabilities
 *
 * @param searchParams - The search parameters from the URL
 * @returns An object containing the customers, total count, and pagination info
 */
export async function fetchCustomers(
  searchParams: ResolvedParams['searchParams'] = {}
) {
  const { page, itemsPerPage } = validatePagination({
    page: (searchParams?.page as string) || '1',
    itemsPerPage: (searchParams?.itemsPerPage as '10') || '10',
  })

  const { sort, order } = validateSortOrder<CustomersTableSortType>({
    sort: searchParams?.sort as CustomerKeys,
    order: searchParams?.order as 'asc' | 'desc',
    schema: CustomersTableSortSchema,
  })

  const offset = (Number(page) - 1) * Number(itemsPerPage)

  const { data, error } = AdminCustomerFilterSchema.safeParse(searchParams)

  if (error) {
    console.log('Validation error: ', error)
  }

  const whereClause = {
    ...(data?.q && { title: { contains: data.q, mode: 'insensitive' } }),
    ...(data?.status && data.status !== 'ALL' && { status: data.status }),
  }

  const customers = await prisma.customer.findMany({
    where: whereClause,
    orderBy: { [sort as string]: order as 'asc' | 'desc' },
    include: { classified: true },
    skip: offset,
    take: Number(itemsPerPage),
  })

  const count = await prisma.customer.count({
    where: whereClause,
  })

  const totalPages = Math.ceil(count / Number(itemsPerPage))

  return {
    customers,
    count,
    pagination: {
      page: Number(page),
      itemsPerPage: Number(itemsPerPage),
      totalPages,
    },
  }
}
