'use client'

import { fetchFavourites, fetchRecords } from '@/_data'
import { cn } from '@/lib/utils'
import type { ResolvedParams } from '@/types'
import { useQuery } from '@tanstack/react-query'
import dynamic from 'next/dynamic'
import { Navigation } from 'swiper/modules'
import { SwiperSlide } from 'swiper/react'
import { Record } from '../../inventory/record'
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

export function SwiperCarousel({
  searchParams,
  className,
}: ResolvedParams & { className?: string }) {
  const { data: favouriteIds = [] } = useQuery({
    queryKey: ['favourites'],
    queryFn: fetchFavourites,
  })

  const { data: records } = useQuery({
    queryKey: ['records', searchParams],
    queryFn: () => fetchRecords(searchParams),
  })

  if (!records || records.length === 0) {
    return null
  }

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
