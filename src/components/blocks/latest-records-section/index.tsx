import 'swiper/css'
import type { ResolvedParams } from '@/types'
import { SwiperCarousel } from './client'

export function LatestRecordsCarousel({ searchParams }: ResolvedParams) {
  return (
    <section className="py-16 sm:py-24">
      <div className="container mx-auto flex max-w-[80vw] flex-col gap-8">
        <h2 className="mt-2 font-bold text-2xl text-foreground uppercase tracking-tight sm:text-4xl">
          Latest Arrivals
        </h2>
        <SwiperCarousel searchParams={searchParams} />
      </div>
    </section>
  )
}
