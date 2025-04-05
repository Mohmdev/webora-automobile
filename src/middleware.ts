import { auth } from '@/auth'
import { env } from '@/env'
import { NextResponse } from 'next/server'
import { routes } from './config/routes'

function setRequestHeaders(requestHeaders: Headers) {
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64')
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

  requestHeaders.set('x-auth-token', `Bearer ${env.X_AUTH_TOKEN}`)

  const contentSecurityPolicy = cspHeader.replace(/\s{2,}/g, ' ').trim()
  requestHeaders.set('x-nonce', nonce)
  requestHeaders.set('Content-Security-Policy', contentSecurityPolicy)
}

export default auth((req) => {
  const nextUrl = req.nextUrl.clone()
  const requestHeaders = new Headers(req.headers)
  setRequestHeaders(requestHeaders)

  // Get current path for potential redirect after auth operations
  const currentPath = new URL(
    req.headers.get('referer') || routes.home,
    req.url
  ).pathname

  if (req.auth) {
    // Handle 2FA requirement
    if (req.auth.requires2FA) {
      if (nextUrl.pathname === routes.challenge) {
        return NextResponse.next()
      }
      return NextResponse.redirect(new URL(routes.challenge, req.url))
    }

    // Redirect users who have completed 2FA from the challenge page
    if (nextUrl.pathname === routes.challenge && !req.auth.requires2FA) {
      // If the current path is the challenge page, we need to redirect to the previous page
      // or home if no previous page exists
      const redirectPath =
        currentPath === routes.challenge ? routes.home : currentPath
      return NextResponse.redirect(new URL(redirectPath, req.url))
    }

    // Handle sign-out redirects
    if (nextUrl.pathname === '/auth/sign-out') {
      return NextResponse.redirect(new URL(currentPath, req.url))
    }

    // Simple redirect for authenticated users on auth pages
    if ([routes.signIn, routes.signUp].includes(nextUrl.pathname)) {
      return NextResponse.redirect(new URL(currentPath, req.url))
    }

    // Protect admin routes
    if (
      nextUrl.pathname.startsWith('/admin') &&
      req.auth.user?.role !== 'ADMIN'
    ) {
      return NextResponse.redirect(new URL(routes.home, req.url))
    }
  } else {
    // Redirect unauthenticated users from protected routes
    if (
      nextUrl.pathname.startsWith('/admin') ||
      nextUrl.pathname === routes.challenge
    ) {
      return NextResponse.redirect(new URL(routes.signIn, req.url))
    }
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
})

export const config = {
  matcher:
    '/((?!api/auth|_next/static|_next/image|favicon.ico|manifest.json|graphics/we-mo.svg).*)',
}
