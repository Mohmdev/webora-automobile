import type { UserRole } from '@prisma/client'
import type NextAuth from 'next-auth'

declare module 'next-auth' {
  interface User extends NextAuth.User {
    requires2FA?: boolean | undefined
    role?: UserRole
  }

  interface Session extends NextAuth.Session {
    requires2FA?: boolean
    role?: UserRole
  }
}
