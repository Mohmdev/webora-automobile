import { fetchClassifiedsByStatus } from '@/_data'
import { redis } from '@/lib/redis-store'
import { getSourceId } from '@/lib/source-id'
import type { FavouritesProps } from '@/types'
import { ClassifiedStatus } from '@prisma/client'
import { LatestArrivalsCarousel } from './latest-arrivals-carousel'

export async function LatestArrivals() {
  const classifieds = await fetchClassifiedsByStatus(ClassifiedStatus.LIVE, 6)

  // If no classifieds found, don't render the section
  if (!classifieds.length) {
    return null
  }

  const sourceId = await getSourceId()
  const getFavouriteIds = await redis.get<FavouritesProps>(sourceId || '')

  // Ensure favouriteIds is always an array
  const favouriteIds = Array.isArray(getFavouriteIds?.favouriteIds)
    ? getFavouriteIds.favouriteIds
    : []

  return (
    <section className="py-16 sm:py-24">
      <div className="container mx-auto flex max-w-[80vw] flex-col gap-8">
        <h2 className="mt-2 font-bold text-2xl text-foreground uppercase tracking-tight sm:text-4xl">
          Latest Arrivals
        </h2>
        <LatestArrivalsCarousel
          classifieds={classifieds}
          favouriteIds={favouriteIds}
        />
      </div>
    </section>
  )
}
