'use server'

import { redis } from '@/lib/redis-store'
import { getSourceId } from '@/lib/source-id'
import type { FavouriteIds, FavouritesProps } from '@/types'

/**
 * Fetches the user's favourite classified IDs from Redis.
 *
 * This function retrieves the list of favourite classified IDs associated with the current user,
 * identified by their `sourceId` stored in a cookie. It fetches this data from the Redis store.
 *
 * @returns {Promise<FavouriteIds>} A promise that resolves to an array of favourite classified IDs.
 *          Returns an empty array if no favourites are found or the user cannot be identified.
 */
export async function fetchFavourites(): Promise<FavouriteIds> {
  const sourceId = await getSourceId()
  const getFavourites = await redis.get<FavouritesProps>(sourceId ?? '')

  const favouriteIds = Array.isArray(getFavourites?.favouriteIds)
    ? getFavourites.favouriteIds
    : []

  return favouriteIds
}
