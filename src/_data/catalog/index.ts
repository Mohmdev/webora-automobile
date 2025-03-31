import { PageSchema } from '@/app/schemas/page.schema'
import { CLASSIFIEDS_PER_PAGE } from '@/config/constants'
import { prisma } from '@/lib/prisma'
import { buildClassifiedFilterQuery } from '@/lib/utils'
import type { ParamsAwaitedProps } from '@/types'
import { ClassifiedStatus } from '@prisma/client'

export async function getRecords(
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

export type QueryReturnMetaProps = {
  resultsCount?: number | null
  minMaxValues?: {
    _min: {
      year: number | null
      price: number | null
      odoReading: number | null
    }
    _max: {
      year: number | null
      price: number | null
      odoReading: number | null
    }
  }
  recordsWithPrice?: { price: number }[] | null
}

export async function getResultsCount(
  searchParams: ParamsAwaitedProps['searchParams']
) {
  const count = await prisma.classified.count({
    where: buildClassifiedFilterQuery(searchParams),
  })

  return count
}

export async function getRecordsWithPriceSelect(
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

export async function getMinMaxValues() {
  const minMaxResult = await prisma.classified.aggregate({
    where: { status: ClassifiedStatus.LIVE },
    _min: {
      year: true,
      price: true,
      odoReading: true,
    },
    _max: {
      price: true,
      year: true,
      odoReading: true,
    },
  })

  return minMaxResult
}
