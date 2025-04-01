import { prisma } from '@/lib/prisma'
import { redis } from '@/lib/redis-store'
import type { FilterOptions } from '@/types'
import { type NextRequest, NextResponse } from 'next/server'

const CACHE_TTL_MAKES = 86400 // 24 hours
const CACHE_TTL_MODELS = 3600 // 1 hour
const CACHE_TTL_VARIANTS = 3600 // 1 hour

/**
 * Fetches taxonomy data with caching support
 */
async function fetchWithCache<T>({
  cacheKey,
  cacheTtl,
  fetchFn,
  logPrefix,
}: {
  cacheKey: string | null
  cacheTtl: number
  fetchFn: () => Promise<T>
  logPrefix: string
}): Promise<T> {
  // If no cache key, just fetch directly
  if (!cacheKey) {
    return fetchFn()
  }

  // Try to get from cache first
  const cachedData = await redis.get<T>(cacheKey)
  if (cachedData) {
    console.log(`Using cached ${logPrefix} data`)
    return cachedData
  }

  // Fetch fresh data
  console.log(`Fetching ${logPrefix} from database`)
  const data = await fetchFn()

  // Cache the result
  await redis.set(cacheKey, JSON.stringify(data), { ex: cacheTtl })
  console.log(`${logPrefix} data cached successfully`)

  return data
}

/**
 * Maps database entities to filter options
 */
function mapToFilterOptions(
  items: Array<{ id: number; name: string }>
): FilterOptions<string, string> {
  return items.map(({ id, name }) => ({
    label: name,
    value: id.toString(),
  }))
}

export async function GET(req: NextRequest) {
  const params = new URL(req.url).searchParams
  const makeParam = params.get('make')
  const modelParam = params.get('model')

  try {
    // Prepare cache keys
    const makesCacheKey = 'taxonomy:makes'
    const modelsCacheKey = makeParam ? `taxonomy:models:${makeParam}` : null
    const variantsCacheKey =
      makeParam && modelParam
        ? `taxonomy:variants:${makeParam}:${modelParam}`
        : null

    // Fetch makes
    const lvMakes = await fetchWithCache<FilterOptions<string, string>>({
      cacheKey: makesCacheKey,
      cacheTtl: CACHE_TTL_MAKES,
      fetchFn: async () => {
        const makes = await prisma.make.findMany({
          select: { id: true, name: true },
          orderBy: { name: 'asc' },
        })
        return mapToFilterOptions(makes)
      },
      logPrefix: 'makes',
    })

    // Fetch models if make is selected
    let lvModels: FilterOptions<string, string> = []
    if (makeParam) {
      lvModels = await fetchWithCache<FilterOptions<string, string>>({
        cacheKey: modelsCacheKey,
        cacheTtl: CACHE_TTL_MODELS,
        fetchFn: async () => {
          const models = await prisma.model.findMany({
            where: { make: { id: Number(makeParam) } },
            select: { id: true, name: true },
          })
          return mapToFilterOptions(models)
        },
        logPrefix: `models for make ${makeParam}`,
      })
    }

    // Fetch model variants if model is selected
    let lvModelVariants: FilterOptions<string, string> = []
    if (makeParam && modelParam) {
      lvModelVariants = await fetchWithCache<FilterOptions<string, string>>({
        cacheKey: variantsCacheKey,
        cacheTtl: CACHE_TTL_VARIANTS,
        fetchFn: async () => {
          const modelVariants = await prisma.modelVariant.findMany({
            where: { model: { id: Number(modelParam) } },
            select: { id: true, name: true },
          })
          return mapToFilterOptions(modelVariants)
        },
        logPrefix: `variants for model ${modelParam}`,
      })
    }

    return NextResponse.json(
      {
        makes: lvMakes,
        models: lvModels,
        modelVariants: lvModelVariants,
      },
      {
        status: 200,
        headers: {
          'Cache-Control':
            'public, max-age=300, s-maxage=600, stale-while-revalidate=3600',
        },
      }
    )
  } catch (error) {
    console.error('Taxonomy API error:', error)

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
