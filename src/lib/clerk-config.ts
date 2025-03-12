/**
 * Clerk configuration
 * This file contains configuration for Clerk
 * It's used to set up the JWT template with our custom claims
 */

// JWT template for Clerk
// This should be configured in the Clerk dashboard
// Under JWT Templates -> Create Template
export const clerkJwtTemplate = {
  userId: "{{user.id}}",
  requires2FA: "{{user.public_metadata.requires2FA}}",
  email: "{{user.email_addresses[0].email_address}}",
}

// Public routes that don't require authentication
export const publicRoutes = [
  "/",
  "/api/auth/(.*)",
  "/auth/sign-in",
  "/auth/sign-out",
  "/auth/error",
  "/inventory/(.*)",
  "/favourites",
]
