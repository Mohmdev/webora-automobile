import { endpoints } from '@/config/endpoints'
import { prisma } from '@/lib/prisma'
import { redis } from '@/lib/redis-store'

// Fetch taxonomy data for prefetching with server-side Redis caching
export async function fetchTaxonomiesData() {
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
