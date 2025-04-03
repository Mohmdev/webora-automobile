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
 * Fetches paginated, sorted, and filtered customer records for the admin panel.
 *
 * This function processes search parameters to retrieve a customized list of customers
 * based on pagination (page, itemsPerPage), sorting (sort, order), and filtering (q, status).
 * It validates the input parameters and constructs the appropriate Prisma query.
 * Includes the associated `classified` record for each customer.
 *
 * @param {ResolvedParams['searchParams']} [searchParams={}] - Search parameters from the request, potentially including `page`, `itemsPerPage`, `sort`, `order`, `q`, and `status`. Defaults to an empty object.
 * @returns {Promise<{
 *   customers: Array<import('@prisma/client').Customer & { classified: import('@prisma/client').Classified | null }>;
 *   count: number;
 *   pagination: {
 *     page: number;
 *     itemsPerPage: number;
 *     totalPages: number;
 *   };
 * }>} A promise that resolves to an object containing the fetched customer records (with associated classified),
 *          the total count of matching records, and pagination details (current page, items per page, total pages).
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
