import { fetchRecordsCount } from '@/_data'
import { BrandsMotionSlider } from '@/components/blocks/brands-section/brands-motion-slider'
import { FeaturedSection } from '@/components/blocks/featured-section'
import { HeroSection } from '@/components/blocks/hero-section/templates/hero-1'
import { LatestArrivals } from '@/components/homepage/latest-arrivals'
import { getQueryClient } from '@/providers/react-query/get-query-client'
import type { ParamsPromisedProps } from '@/types'
import { HydrationBoundary, dehydrate } from '@tanstack/react-query'

export default async function Home(props: ParamsPromisedProps) {
  const searchParams = await props.searchParams
  const queryClient = getQueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['recordsCount', searchParams],
    queryFn: () => fetchRecordsCount(searchParams),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="min-h-screen w-full">
        <HeroSection searchParams={searchParams} />
        <BrandsMotionSlider iconHeight="h-18" enableStaticText={true} />
        <FeaturedSection />
        <LatestArrivals />
      </div>
    </HydrationBoundary>
  )
}
