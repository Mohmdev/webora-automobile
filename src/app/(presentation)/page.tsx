import { FeaturesSection } from '@/components/homepage/features-section'
import { HeroSection } from '@/components/homepage/hero-section'
import { LatestArrivals } from '@/components/homepage/latest-arrivals'
import { OurBrandsSection } from '@/components/homepage/our-brands-section'
import { getResultsCount } from '@/data/catalog'
import type { ParamsPromisedProps } from '@/types'

export default async function Home(props: ParamsPromisedProps) {
  const searchParams = await props.searchParams
  const resultsCount = await getResultsCount(searchParams)

  return (
    <div className="min-h-screen w-full">
      <HeroSection searchParams={searchParams} resultsCount={resultsCount} />
      <FeaturesSection />
      <LatestArrivals />
      <OurBrandsSection />
    </div>
  )
}
