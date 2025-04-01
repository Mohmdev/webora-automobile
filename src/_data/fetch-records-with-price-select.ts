import { prisma } from '@/lib/prisma'
import { buildClassifiedFilterQuery } from '@/lib/utils'
import type { ParamsAwaitedProps } from '@/types'

export async function fetchRecordsWithPriceSelect(
  searchParams: ParamsAwaitedProps['searchParams']
) {
  const recordsWithPrice = await prisma.classified.findMany({
    where: buildClassifiedFilterQuery(searchParams),
    select: {
      price: true,
    },
  })

  return recordsWithPrice
}
