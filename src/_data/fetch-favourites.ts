'use server'

import { redis } from '@/lib/redis-store'
import { getSourceId } from '@/lib/source-id'
import type { FavouriteIds, FavouritesProps } from '@/types'

/**
 * Fetches the user's favourite classified IDs from Redis
 * Uses the sourceId cookie to identify the user
 */
export async function fetchFavourites(): Promise<FavouriteIds> {
  const sourceId = await getSourceId()
  const getFavourites = await redis.get<FavouritesProps>(sourceId ?? '')

  const favouriteIds = Array.isArray(getFavourites?.favouriteIds)
    ? getFavourites.favouriteIds
    : []

  return favouriteIds
}
