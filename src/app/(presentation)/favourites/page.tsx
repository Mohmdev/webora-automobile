import { Record } from '@/components/catalog/record'
import { CustomPagination } from '@/components/shared/custom-pagination'
import { CLASSIFIEDS_PER_PAGE } from '@/config/constants'
import { routes } from '@/config/routes'
import { prisma } from '@/lib/prisma'
import { redis } from '@/lib/redis-store'
import { getSourceId } from '@/lib/source-id'
import { PageSchema } from '@/schemas/page.schema'
import type { FavouritesProps, ParamsPromisedProps } from '@/types'

export default async function FavouritesPage(props: ParamsPromisedProps) {
  const searchParams = await props.searchParams
  const validPage = PageSchema.parse(searchParams?.page)

  // get the current page
  const page = validPage ? validPage : 1

  // calculate the offset
  const offset = (page - 1) * CLASSIFIEDS_PER_PAGE

  const sourceId = await getSourceId()
  const getFavourites = await redis.get<FavouritesProps>(sourceId ?? '')

  // Ensure favouriteIds is always an array
  const favouriteIds = Array.isArray(getFavourites?.favouriteIds)
    ? getFavourites.favouriteIds
    : []

  const classifieds = await prisma.classified.findMany({
    where: { id: { in: favouriteIds } },
    include: { images: { take: 1 } },
    skip: offset,
    take: CLASSIFIEDS_PER_PAGE,
  })

  const count = await prisma.classified.count({
    where: { id: { in: favouriteIds } },
  })

  const totalPages = Math.ceil(count / CLASSIFIEDS_PER_PAGE)

  return (
    <div className="container mx-auto min-h-[80dvh] px-4 py-8">
      <h1 className="mb-6 font-bold text-3xl">Your Favourite Classifieds</h1>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
        {classifieds.map((classified) => {
          return (
            <Record
              key={classified.id}
              template="card-1"
              record={classified}
              favouriteIds={favouriteIds}
            />
          )
        })}
      </div>
      <div className="mt-8 flex">
        <CustomPagination
          baseURL={routes.favourites}
          totalPages={totalPages}
          styles={{
            paginationRoot: 'justify-center',
            paginationPrevious: '',
            paginationNext: '',
            paginationLinkActive: '',
            paginationLink: 'border-none active:border',
          }}
        />
      </div>
    </div>
  )
}
