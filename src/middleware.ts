import { env } from "@/env"
import { publicRoutes } from "@/lib/clerk-config"
import { clerkMiddleware } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import { routes } from "./config/routes"

export default clerkMiddleware(async (auth, req) => {
  // Set custom headers
  const requestHeaders = new Headers(req.headers)
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64")
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic';
    style-src 'self' 'nonce-${nonce}';
    img-src 'self' blob: data:;
    font-src 'self';
    base-uri 'self';
    object-src 'none';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
  `

  requestHeaders.set("x-auth-token", `Bearer ${env.X_AUTH_TOKEN}`)
  const contentSecurityPolicy = cspHeader.replace(/\s{2,}/g, " ").trim()
  requestHeaders.set("x-nonce", nonce)
  requestHeaders.set("Content-Security-Policy", contentSecurityPolicy)

  // Get the current path
  const { pathname } = req.nextUrl

  // Check if the route is public
  const isPublicRoute = publicRoutes.some((route) => {
    if (route.includes("(.*)")) {
      const pattern = new RegExp(route.replace("(.*)", ".*"))
      return pattern.test(pathname)
    }
    return pathname === route
  })

  // Get auth data using the auth() method
  const { userId, sessionClaims } = await auth()

  // Handle 2FA challenge logic
  if (sessionClaims?.requires2FA) {
    if (pathname === routes.challenge) {
      return NextResponse.next({
        request: { headers: requestHeaders },
      })
    }

    const challengeUrl = new URL(routes.challenge, req.url)
    return NextResponse.redirect(challengeUrl)
  }

  // Redirect authenticated users from sign-in or challenge pages
  if (userId) {
    if (pathname === routes.challenge || pathname === routes.signIn) {
      const adminUrl = new URL(routes.admin.dashboard, req.url)
      return NextResponse.redirect(adminUrl)
    }
  } else {
    // Redirect unauthenticated users from protected pages
    if (!isPublicRoute) {
      if (pathname.startsWith("/admin") || pathname === routes.challenge) {
        const signInUrl = new URL(routes.signIn, req.url)
        return NextResponse.redirect(signInUrl)
      }
    }
  }

  // Continue with request
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
})

export const config = {
  matcher: [
    "/((?!api/auth|_next/static|_next/image|favicon.ico|manifest.json|logo.svg).*)",
  ],
}
