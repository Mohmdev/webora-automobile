import { prisma } from '@/lib/prisma'
import { ClassifiedStatus } from '@prisma/client'

export async function fetchMinMaxValues() {
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
