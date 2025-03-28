import { prisma } from '@/lib/prisma'
import { redis } from '@/lib/redis-store'
import { getSourceId } from '@/lib/source-id'
import type { Favourites } from '@/types'
import { ClassifiedStatus } from '@prisma/client'
import { LatestArrivalsCarousel } from './latest-arrivals-carousel'

export const LatestArrivals = async () => {
  const classifieds = await prisma.classified.findMany({
    where: { status: ClassifiedStatus.LIVE },
    take: 6,
    include: { images: true },
  })

  const sourceId = await getSourceId()
  const favourites = await redis.get<Favourites>(sourceId || '')
  return (
    <section className="py-16 sm:py-24">
      <div className="container mx-auto max-w-[80vw]">
        <h2 className="mt-2 font-bold text-2xl text-foreground uppercase tracking-tight sm:text-4xl">
          Latest Arrivals
        </h2>
        <LatestArrivalsCarousel
          classifieds={classifieds}
          favourites={favourites ? favourites.ids : []}
        />
      </div>
    </section>
  )
}
