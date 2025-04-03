import { imageSources } from '@/config/constants'
import { cn } from '@/lib/utils'
import type { ResolvedParams } from '@/types'
import Image from 'next/image'
import { HeroFiltersPanel } from '../../hero-filters-panel'
import { HeroHeading } from './heading'

export const HeroSection = ({
  imgSrc,
  h1,
  h2,
  searchParams,
  className,
}: ResolvedParams & {
  imgSrc?: string
  h1?: string
  h2?: string
  className?: string
}) => {
  return (
    <section
      className={cn(
        'relative flex h-[calc(100vh-4rem)] items-center justify-center bg-center bg-cover',
        className
      )}
    >
      <Image
        src={imgSrc ? imgSrc : imageSources.gClass3}
        alt="G-Class"
        fill
        className="absolute inset-0 object-cover"
      />
      <div className="container relative z-10 grid-cols-2 items-center space-y-12 lg:grid">
        <HeroHeading h1={h1} h2={h2} />

        <HeroFiltersPanel searchParams={searchParams} />
      </div>
    </section>
  )
}
