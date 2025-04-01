import { CLASSIFIEDS_PER_PAGE } from '@/config/constants'
import { prisma } from '@/lib/prisma'
import { buildClassifiedFilterQuery } from '@/lib/utils'
import { PageSchema } from '@/schemas/page.schema'
import type { ParamsAwaitedProps } from '@/types'

export async function fetchRecords(
  searchParams: ParamsAwaitedProps['searchParams']
) {
  const validPage = PageSchema.parse(searchParams?.page)

  // get the current page
  const page = validPage ? validPage : 1

  // calculate the offset
  const offset = (page - 1) * CLASSIFIEDS_PER_PAGE

  const classifieds = await prisma.classified.findMany({
    where: buildClassifiedFilterQuery(searchParams),
    include: { images: { take: 1 } },
    skip: offset,
    take: CLASSIFIEDS_PER_PAGE,
  })

  return classifieds
}
