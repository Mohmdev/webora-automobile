'use client'

import { navLinks } from '@/config/constants'
import { routes } from '@/config/routes'
import { cn } from '@/lib/utils'
import type { Session } from '@auth/core/types'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { Logo } from '../../../shared/logo'
import { HeaderButtons } from './header-buttons'

export const Header5Client = ({ session }: { session: Session | null }) => {
  const [menuState, setMenuState] = React.useState(false)
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [isMounted, setIsMounted] = React.useState(false)

  React.useEffect(() => {
    setIsMounted(true)
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav data-state={menuState && 'active'} className="fixed z-20 w-full px-2">
      <div
        className={cn(
          'mx-auto mt-2 max-w-6xl border border-border/0 bg-background/0 px-6 transition-all duration-300 lg:px-12',
          isScrolled &&
            'max-w-4xl rounded-2xl lg:bg-background/50 lg:px-5 lg:backdrop-blur-lg lg:dark:border-border/100'
          // isScrolled &&
          //   'max-w-4xl rounded-2xl border-border/100 bg-background/50 backdrop-blur-lg lg:px-5'
        )}
      >
        <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
          <div className="flex w-full justify-between lg:w-auto">
            <Link
              href={routes.home}
              aria-label="home"
              className="flex items-center space-x-2"
            >
              <Logo />
            </Link>

            <button
              type="button"
              onClick={() => setMenuState(!menuState)}
              aria-label={menuState === true ? 'Close Menu' : 'Open Menu'}
              className="-m-2.5 -mr-4 relative z-20 block cursor-pointer p-2.5 lg:hidden"
            >
              <Menu className="m-auto size-6 in-data-[state=active]:rotate-180 in-data-[state=active]:scale-0 in-data-[state=active]:opacity-0 duration-200" />
              <X className="-rotate-180 absolute inset-0 m-auto size-6 in-data-[state=active]:rotate-0 in-data-[state=active]:scale-100 scale-0 in-data-[state=active]:opacity-100 opacity-0 duration-200" />
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="absolute inset-0 m-auto hidden size-fit lg:block">
            <ul className="flex gap-8 text-sm">
              {navLinks.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.href}
                    className="block text-muted-foreground duration-150 hover:text-accent-foreground"
                  >
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Motion Section + Mobile Menu */}
          <AnimatePresence>
            {(menuState || (isMounted && window.innerWidth >= 1024)) && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="mb-6 w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border bg-background p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent"
              >
                <div className="lg:hidden">
                  <ul className="space-y-6 text-base">
                    {navLinks.map((item, index) => (
                      <li key={index}>
                        <Link
                          href={item.href}
                          className="block text-muted-foreground duration-150 hover:text-accent-foreground"
                        >
                          <span>{item.label}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <HeaderButtons
                  isScrolled={isScrolled}
                  isMounted={isMounted}
                  session={session}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  )
}
