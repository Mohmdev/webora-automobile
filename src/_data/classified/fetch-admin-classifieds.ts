import { prisma } from '@/lib/prisma'
import { validatePagination } from '@/schemas/pagination.schema'
import { AdminClassifiedFilterSchema } from '@/schemas/table-filters.schema'
import {
  ClassifiedsTableSortSchema,
  type ClassifiedsTableSortType,
  validateSortOrder,
} from '@/schemas/table-sort.schema'
import type { ClassifiedKeys, ResolvedParams } from '@/types'
import type { Prisma } from '@prisma/client'

/**
 * Fetches paginated, sorted, and filtered classified listings for the admin panel.
 *
 * This function processes search parameters to retrieve a customized view of classified listings
 * based on pagination (page, itemsPerPage), sorting (sort, order), and filtering (q, status).
 * It validates the input parameters and constructs the appropriate Prisma query.
 *
 * Used in the admin classifieds table to display and manage listings with advanced controls.
 *
 * @param {ResolvedParams['searchParams']} searchParams - Search parameters from the request, potentially including `page`, `itemsPerPage`, `sort`, `order`, `q`, and `status`.
 * @returns {Promise<{
 *   classifieds: Array<import('@prisma/client').Classified & { images: import('@prisma/client').Image[] }>;
 *   count: number;
 *   totalPages: number;
 *   page: number;
 *   itemsPerPage: number;
 *   sort: ClassifiedsTableSortType;
 *   order: 'asc' | 'desc';
 * }>} A promise that resolves to an object containing the fetched classified listings (with the first image included),
 *          the total count of matching records, total pages, and the current pagination/sorting state.
 */
export async function fetchAdminClassifieds(
  searchParams: ResolvedParams['searchParams']
) {
  // Process pagination parameters
  const { page, itemsPerPage } = validatePagination({
    page: (searchParams?.page as string) || '1',
    itemsPerPage: (searchParams?.itemsPerPage as '10') || '10',
  })

  // Process sorting parameters
  const { sort, order } = validateSortOrder<ClassifiedsTableSortType>({
    sort: searchParams?.sort as ClassifiedKeys,
    order: searchParams?.order as 'asc' | 'desc',
    schema: ClassifiedsTableSortSchema,
  })

  const offset = (Number(page) - 1) * Number(itemsPerPage)

  // Process filter parameters
  const { data, error } = AdminClassifiedFilterSchema.safeParse(searchParams)

  if (error) {
    console.log('Validation error: ', error)
  }

  const whereClause: Prisma.ClassifiedWhereInput = {
    ...(data?.q && { title: { contains: data.q, mode: 'insensitive' } }),
    ...(data?.status && data.status !== 'ALL' && { status: data.status }),
  }

  // Fetch classified listings with pagination and sorting
  const classifieds = await prisma.classified.findMany({
    where: whereClause,
    orderBy: { [sort as string]: order as 'asc' | 'desc' },
    include: { images: { take: 1 } },
    skip: offset,
    take: Number(itemsPerPage),
  })

  const count = await prisma.classified.count({
    where: whereClause,
  })

  const totalPages = Math.ceil(count / Number(itemsPerPage))

  return {
    classifieds,
    count,
    totalPages,
    page: Number(page),
    itemsPerPage: Number(itemsPerPage),
    sort,
    order,
  }
}
