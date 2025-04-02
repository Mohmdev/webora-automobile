import { BrandsMotionSlider } from '@/components/blocks/brands-section/brands-motion-slider'
import { FeaturedSection } from '@/components/blocks/featured-section'
import { HeroSection } from '@/components/homepage/hero-section'
import { LatestArrivals } from '@/components/homepage/latest-arrivals'
import type { ParamsPromisedProps } from '@/types'

export default async function Home(props: ParamsPromisedProps) {
  const searchParams = await props.searchParams

  return (
    <div className="min-h-screen w-full">
      <HeroSection searchParams={searchParams} />
      <BrandsMotionSlider iconHeight="h-18" enableStaticText={true} />
      <FeaturedSection />
      <LatestArrivals />
    </div>
  )
}
