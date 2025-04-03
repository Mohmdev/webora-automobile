'use client'

import { QueryClientProvider } from '@tanstack/react-query'
import type React from 'react'
import { getQueryClient } from './get-query-client'

export function ReactQueryProvider({
  children,
}: { children: React.ReactNode }) {
  const queryClient = getQueryClient()

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
