'use client'

import { cn } from '@/lib/utils'
import { MoonIcon, SunIcon } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

interface ThemeToggleProps {
  className?: string
}

export const ThemeToggle = ({ className }: ThemeToggleProps) => {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Don't render anything until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <button
        className={cn(
          'relative grid size-8 cursor-pointer place-items-center overflow-hidden rounded-full transition-colors duration-300',
          "shrink-0 outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
          className
        )}
        type="button"
      />
    )
  }

  return (
    <motion.button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className={cn(
        'relative grid size-8 cursor-pointer place-items-center overflow-hidden rounded-full transition-colors duration-300',
        "shrink-0 outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        theme === 'dark' ? 'hover:bg-slate-800' : 'hover:bg-slate-200',
        className
      )}
      animate={{
        backgroundColor:
          theme === 'dark' ? 'rgba(0, 0, 0, 1)' : 'rgba(255, 255, 255, 1)',
      }}
      transition={{ duration: 0.35, ease: [0.34, 1.56, 0.64, 1] }}
    >
      <AnimatePresence mode="wait" initial={false}>
        {mounted && (
          <motion.div
            key={theme}
            initial={{ scale: 0.5, opacity: 0, rotate: -30 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0.5, opacity: 0, rotate: 30 }}
            transition={{ duration: 0.35, ease: [0.34, 1.56, 0.64, 1] }}
            className="absolute inset-0 flex items-center justify-center"
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </motion.div>
        )}
        {!mounted && (
          <span className="opacity-0">
            <SunIcon />
          </span>
        )}
      </AnimatePresence>
    </motion.button>
  )
}
