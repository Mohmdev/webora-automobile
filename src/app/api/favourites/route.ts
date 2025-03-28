import { validateIdSchema } from '@/app/schemas/id.schema'
import { routes } from '@/config/routes'
import { redis } from '@/lib/redis-store'
import { setSourceId } from '@/lib/source-id'
import type { FavouriteIds } from '@/types'
import { revalidatePath } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'

export const POST = async (req: NextRequest) => {
  const body = await req.json()

  const { data, error } = validateIdSchema.safeParse(body)

  if (!data) {
    return NextResponse.json({ error: error?.message }, { status: 400 })
  }

  if (typeof data.id !== 'number') {
    return NextResponse.json({ error: 'Invalid ID' }, { status: 400 })
  }

  // get the source id from cookies
  const sourceId = await setSourceId()

  // retrieve the existing favourites from redis session
  const storedFavourites = await redis.get<FavouriteIds>(sourceId)
  let favouriteIds: FavouriteIds = storedFavourites || []

  if (favouriteIds.includes(data.id)) {
    // add or remove the ID based on its current presence in the favourites
    // remove the ID if it already exists
    favouriteIds = favouriteIds.filter((favId) => favId !== data.id)
  } else {
    // add the id of it does not exist
    favouriteIds.push(data.id)
  }

  // update the redis store with the new list of ids
  await redis.set(sourceId, favouriteIds)

  revalidatePath(routes.favourites)

  return NextResponse.json({ ids: favouriteIds }, { status: 200 })
}
