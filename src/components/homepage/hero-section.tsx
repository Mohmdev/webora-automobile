import { routes } from '@/config/routes'
import { prisma } from '@/lib/prisma'
import { buildClassifiedFilterQuery } from '@/lib/utils'
import type { ParamsAwaitedProps } from '@/types'
import { ClassifiedStatus } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'
import {
  PriceFilter,
  TaxonomyFiltersBlock,
  YearFilter,
} from '../filters/render-filters'
import { Button } from '../ui/button'
import { SearchButton } from './search-button'

export const HeroSection = async ({ searchParams }: ParamsAwaitedProps) => {
  const totalFiltersApplied = Object.keys(searchParams || {}).length
  const isFilterApplied = totalFiltersApplied > 0

  const classifiedsCount = await prisma.classified.count({
    where: buildClassifiedFilterQuery(searchParams),
  })

  const minMaxResult = await prisma.classified.aggregate({
    where: { status: ClassifiedStatus.LIVE },
    _min: {
      year: true,
      price: true,
      odoReading: true,
    },
    _max: {
      price: true,
      year: true,
      odoReading: true,
    },
  })

  return (
    <section className="relative flex h-[calc(100vh-4rem)] items-center justify-center bg-center bg-cover">
      <Image
        src="/aesthetic/g-class-1.jpeg"
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
              <YearFilter
                minMaxValues={minMaxResult}
                searchParams={searchParams}
              />

              <PriceFilter
                minMaxValues={minMaxResult}
                searchParams={searchParams}
              />
            </div>
            <SearchButton count={classifiedsCount} />
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
