import { redis } from '@/lib/redis-store'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Test Redis connection
    const pingResult = await redis.ping()

    // Try to set a value
    await redis.set('debug-test', 'Hello from Redis', { ex: 60 })

    // Try to retrieve the value
    const testValue = await redis.get('debug-test')

    return NextResponse.json({
      status: 'success',
      ping: pingResult,
      testValue,
    })
  } catch (error) {
    console.error('Redis debug error:', error)

    return NextResponse.json(
      {
        status: 'error',
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
      },
      { status: 500 }
    )
  }
}
