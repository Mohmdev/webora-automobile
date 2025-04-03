import { endpoints } from '@/config/endpoints'
import { prisma } from '@/lib/prisma'
import { redis } from '@/lib/redis-store'

/**
 * Fetches taxonomy data (makes, models, model variants) with server-side Redis caching.
 *
 * This function attempts to fetch makes data from the Redis cache first.
 * If the data is not found in the cache, it fetches the makes from the database,
 * stores them in the cache with a 24-hour expiration, and then returns the data.
 * If Redis or database operations fail, it falls back to fetching the data from the API endpoint.
 *
 * @returns {Promise<{ makes: any[], models: any[], modelVariants: any[] }>} A promise that resolves to the taxonomy data.
 *          Initially, only 'makes' might be populated from cache/DB; 'models' and 'modelVariants' are empty.
 *          In case of fallback, it returns the full response from the API.
 */
export async function fetchTaxonomiesDataFromRedis() {
  try {
    // Check Redis cache first
    const makesCacheKey = 'taxonomy:makes'
    const cachedMakes = await redis.get<string>(makesCacheKey)

    if (cachedMakes) {
      return {
        makes: cachedMakes,
        models: [],
        modelVariants: [],
      }
    }

    // If not in cache, fetch from database and cache
    const makes = await prisma.make.findMany({
      select: { id: true, name: true },
      orderBy: { name: 'asc' },
    })

    const formattedMakes = makes.map(({ id, name }) => ({
      label: name,
      value: id.toString(),
    }))

    // Cache for 24 hours
    await redis.set(makesCacheKey, JSON.stringify(formattedMakes), {
      ex: 86400,
    })

    return {
      makes: formattedMakes,
      models: [],
      modelVariants: [],
    }
  } catch (error) {
    console.error('Error in taxonomy prefetching:', error)

    // Fallback to API fetch if Redis or database operations fail
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}${endpoints.taxonomy}`
    )
    if (!response.ok) {
      throw new Error('Failed to fetch taxonomy data')
    }
    return await response.json()
  }
}
