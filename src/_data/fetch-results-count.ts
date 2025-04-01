import { prisma } from '@/lib/prisma'
import { buildClassifiedFilterQuery } from '@/lib/utils'
import type { ParamsAwaitedProps } from '@/types'

export async function fetchResultsCount(
  searchParams: ParamsAwaitedProps['searchParams']
) {
  const count = await prisma.classified.count({
    where: buildClassifiedFilterQuery(searchParams),
  })

  return count
}
