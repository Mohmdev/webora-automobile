'use client'
import { SignOutForm } from '@/components/auth/sign-out-form'
import { Button } from '@/components/ui/button'
import { routes } from '@/config/routes'
import { useIsTablet } from '@/hooks/use-mobile'
import { cn } from '@/lib/utils'
import type { Session } from '@auth/core/types'
import { motion } from 'framer-motion'
import Link from 'next/link'

interface HeaderButtonsProps {
  isScrolled: boolean
  isMounted: boolean
  session: Session | null
}

export function HeaderButtons({
  isScrolled,
  isMounted,
  session,
}: HeaderButtonsProps) {
  const isTablet = useIsTablet()
  if (session) {
    return (
      <div className="flex w-full flex-col items-center gap-3 lg:mb-0 lg:w-fit lg:flex-row lg:space-y-0">
        {(session.user as { role: string })?.role === 'ADMIN' && (
          <Button
            variant={isTablet ? 'outline' : 'ghost'}
            // asChild
            size="sm"
            className="w-full text-muted-foreground hover:text-foreground lg:w-max"
          >
            <Link href={routes.admin.dashboard}>Backoffice</Link>
          </Button>
        )}
        {/* <SignOutAllSessionsForm /> */}
        <SignOutForm />
      </div>
    )
  }

  return (
    <div className="-mb-3 flex w-full flex-col gap-3 sm:flex-row sm:space-y-0 md:w-fit lg:mb-0">
      {/* Login Button */}
      <motion.div
        animate={{
          opacity:
            !isScrolled || !isMounted || window.innerWidth < 1024 ? 1 : 0,
          scale:
            !isScrolled || !isMounted || window.innerWidth < 1024 ? 1 : 0.8,
          transition: { duration: 0.2 },
        }}
      >
        <Button
          asChild
          variant="outline"
          size="sm"
          className={cn('w-full', isScrolled && 'lg:hidden')}
        >
          <Link href={routes.signIn}>
            <span>Login</span>
          </Link>
        </Button>
      </motion.div>

      {/* Sign Up Button */}
      <motion.div
        animate={{
          opacity:
            !isScrolled || !isMounted || window.innerWidth < 1024 ? 1 : 0,
          scale:
            !isScrolled || !isMounted || window.innerWidth < 1024 ? 1 : 0.8,
          transition: { duration: 0.2 },
        }}
      >
        <Button
          asChild
          size="sm"
          className={cn('w-full', isScrolled && 'lg:hidden')}
        >
          <Link href={routes.signUp}>
            <span>Sign Up</span>
          </Link>
        </Button>
      </motion.div>

      {/* Get Started Button */}
      <motion.div
        animate={{
          opacity: isScrolled && isMounted && window.innerWidth >= 1024 ? 1 : 0,
          scale: isScrolled && isMounted && window.innerWidth >= 1024 ? 1 : 0.8,
          transition: { duration: 0.3 },
        }}
      >
        <Button
          asChild
          size="sm"
          className={cn(isScrolled ? 'lg:inline-flex' : 'hidden')}
        >
          <Link href={routes.inventory}>
            <span>Get Started</span>
          </Link>
        </Button>
      </motion.div>
    </div>
  )
}
