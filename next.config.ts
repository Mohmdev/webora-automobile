import type { NextConfig } from 'next'
import { env } from './env.mjs'

const nextConfig: NextConfig = {
  compress: true,
  reactStrictMode: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  experimental: {
    authInterrupts: true,
    reactCompiler: true,
    optimizeCss: true,
    optimizeServerReact: true,
    optimizePackageImports: ['lucide-react', 'date-fns'],
  },
  serverExternalPackages: ['bcryptjs'],
  images: {
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year,
    remotePatterns: [
      ...[env.NEXT_PUBLIC_APP_URL /* 'https://example.com' */].map((item) => {
        const url = new URL(item)

        return {
          hostname: url.hostname,
          protocol: url.protocol.replace(':', '') as 'http' | 'https',
        }
      }),
      {
        hostname: '127.0.0.1',
        protocol: 'http',
      },
      {
        hostname: 'localhost',
        protocol: 'http',
      },
      {
        hostname: 'res.cloudinary.com',
        protocol: 'https',
      },
      {
        hostname: 'vl.imgix.net',
        protocol: 'https',
      },
      {
        hostname: 'webora-s3.imgix.net',
        protocol: 'https',
      },
      {
        hostname: 'bucket-webora-automobile.s3.eu-central-1.amazonaws.com',
        protocol: 'https',
      },
      {
        hostname: 'html.tailus.io',
        protocol: 'https',
      },
    ],
  },
  async headers() {
    const headerConfig = [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Permissions-Policy',
            value: `camera=(), microphone=(), geolocation=(), midi=(), sync-xhr=(), fullscreen=(self "${process.env.NEXT_PUBLIC_APP_URL}"), geolocation=("${process.env.NEXT_PUBLIC_APP_URL}")`,
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ]
    return await Promise.resolve(headerConfig)
  },
}

export default nextConfig
