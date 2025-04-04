import {
  fetchBrands,
  fetchFavourites,
  fetchMinMaxValues,
  fetchRecords,
  fetchRecordsCount,
} from '@/_data'
import { BrandsMotionSlider } from '@/components/blocks/brands-section/brands-motion-slider'
import { FeaturedSection } from '@/components/blocks/featured-section'
import { HeroSection } from '@/components/blocks/hero-section/templates/hero-2'
import { LatestRecordsCarousel } from '@/components/blocks/latest-records-section'
import { getQueryClient } from '@/providers/react-query/get-query-client'
import type { PromisedParams } from '@/types'
import { HydrationBoundary, dehydrate } from '@tanstack/react-query'

export default async function Home(props: PromisedParams) {
  const searchParams = await props.searchParams
  const queryClient = getQueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['minMaxValues'],
    queryFn: fetchMinMaxValues,
  })
  await queryClient.prefetchQuery({
    queryKey: ['records', searchParams],
    queryFn: () => fetchRecords(searchParams),
  })
  await queryClient.prefetchQuery({
    queryKey: ['recordsCount', searchParams],
    queryFn: () => fetchRecordsCount(searchParams),
  })
  await queryClient.prefetchQuery({
    queryKey: ['favourites'],
    queryFn: fetchFavourites,
  })
  await queryClient.prefetchQuery({
    queryKey: ['brands'],
    queryFn: fetchBrands,
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="min-h-screen w-full">
        <HeroSection searchParams={searchParams} />
        <BrandsMotionSlider iconHeight="h-18" enableStaticText={true} />
        <FeaturedSection />
        <LatestRecordsCarousel searchParams={searchParams} />
      </div>
    </HydrationBoundary>
  )
}
