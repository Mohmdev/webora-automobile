'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { useEffect, useState } from 'react'
import type * as React from 'react'

interface ThemeProviderProps
  extends React.ComponentProps<typeof NextThemesProvider> {
  preventHydrationMismatch?: boolean
}

export function ThemeProvider({
  children,
  preventHydrationMismatch = false,
  ...props
}: ThemeProviderProps) {
  const [mounted, setMounted] = useState(false)

  // Only render children after first client-side render to prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (preventHydrationMismatch && !mounted) {
    return <>{children}</>
  }

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
