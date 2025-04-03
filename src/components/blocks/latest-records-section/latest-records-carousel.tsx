'use client'

import { fetchClassifiedsByStatus } from '@/_data'
import { redis } from '@/lib/redis-store'
import { getSourceId } from '@/lib/source-id'
import { cn } from '@/lib/utils'
import type { ClassifiedData, ClassifiedImages, FavouritesProps } from '@/types'
import { ClassifiedStatus } from '@prisma/client'
import dynamic from 'next/dynamic'
import { Navigation } from 'swiper/modules'
import { SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { Record } from '../../catalog/record'
import { SwiperButtons } from '../../shared/swiper-button'

const Swiper = dynamic(() => import('swiper/react').then((mod) => mod.Swiper), {
  ssr: false,
  loading: () => (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4">
      {[1, 2, 3, 4].map((i) => (
        <Record key={i} template="skeleton-1" />
      ))}
    </div>
  ),
})

function SwiperCarousel({
  records,
  favouriteIds,
  className,
}: {
  records: (ClassifiedData & ClassifiedImages)[]
  favouriteIds: number[]
  className?: string
}) {
  return (
    <div className={cn('relative', className)}>
      <Swiper
        navigation={{
          prevEl: '.swiper-button-prev',
          nextEl: '.swiper-button-next',
        }}
        pagination={{ clickable: true }}
        modules={[Navigation]}
        loop={true}
        spaceBetween={30}
        slidesPerView={1}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
          1536: {
            slidesPerView: 4,
          },
        }}
        setWrapperSize={false}
        autoHeight={false}
      >
        {records.map((classified) => {
          return (
            <SwiperSlide key={classified.id} className="">
              <Record
                template="card-2"
                record={classified}
                favouriteIds={favouriteIds}
              />
            </SwiperSlide>
          )
        })}
      </Swiper>
      <SwiperButtons
        prevClassName="-left-16 border border-2 border-border hidden lg:flex"
        nextClassName="-right-16 border border-2 border-border hidden lg:flex"
      />
    </div>
  )
}

export async function LatestRecordsCarousel() {
  const records = await fetchClassifiedsByStatus(ClassifiedStatus.LIVE, 6)

  // If no classifieds found, don't render the section
  if (!records.length) {
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
        <SwiperCarousel records={records} favouriteIds={favouriteIds} />
      </div>
    </section>
  )
}
