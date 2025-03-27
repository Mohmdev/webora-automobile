import { ThemeProvider } from '@/components/theme-provider'
import type { Favourites, PageProps } from '@/config/types'
import { prisma } from '@/lib/prisma'
import { redis } from '@/lib/redis-store'
import { getSourceId } from '@/lib/source-id'
import { buildClassifiedFilterQuery } from '@/lib/utils'
import { ClassifiedStatus } from '@prisma/client'
import { getInventory } from './_data'
import { Archive } from './components/archive'

export default async function CatalogPage(props: PageProps) {
  const searchParams = await props.searchParams
  const classifieds = getInventory(searchParams)
  const sourceId = await getSourceId()
  const favourites = await redis.get<Favourites>(sourceId ?? '')
  const count = await prisma.classified.count({
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
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <Archive
        classifieds={classifieds}
        favourites={favourites ? favourites.ids : []}
        minMaxValues={minMaxResult}
        searchParams={searchParams}
      />
    </ThemeProvider>
  )
}
