import { imageSources } from '@/config/constants'
import { routes } from '@/config/routes'
import type { ParamsAwaitedProps } from '@/types'
import Image from 'next/image'
import Link from 'next/link'
import {
  PriceFilter,
  TaxonomyFiltersBlock,
  YearFilter,
} from '../filters/render-filters'
import { SearchButton } from '../shared/search-button'
import { Button } from '../ui/button'

export const HeroSection = ({ searchParams }: ParamsAwaitedProps) => {
  const totalFiltersApplied = Object.keys(searchParams || {}).length
  const isFilterApplied = totalFiltersApplied > 0

  return (
    <section className="relative flex h-[calc(100vh-4rem)] items-center justify-center bg-center bg-cover">
      <Image
        src={imageSources.gClass3}
        alt="G-Class"
        fill
        className="absolute inset-0 object-cover"
      />
      <div className="container relative z-10 grid-cols-2 items-center space-y-12 lg:grid">
        <div className="px-10 lg:px-0">
          <h1 className="text-center font-extrabold text-2xl text-white uppercase md:text-4xl lg:text-left lg:text-8xl">
            Unbeatable Deals on New & Used Cars
          </h1>
          <h2 className="mt-4 text-center text-base text-white uppercase md:text-3xl lg:text-left lg:text-4xl">
            Discover your dream car today
          </h2>
        </div>
        <div className="mx-auto w-full max-w-md rounded-md bg-background/10 p-6 shadow-lg backdrop-blur-xl">
          <div className="space-y-4">
            <div className="flex w-full flex-col gap-x-4 space-y-2 text-white">
              <TaxonomyFiltersBlock searchParams={searchParams} />
              <YearFilter searchParams={searchParams} />

              <PriceFilter searchParams={searchParams} />
            </div>
            <SearchButton searchParams={searchParams} />
            {isFilterApplied && (
              <Button
                asChild
                variant="outline"
                className="w-full hover:bg-slate-200"
              >
                <Link href={routes.home}>
                  Clear Filters ({totalFiltersApplied})
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
