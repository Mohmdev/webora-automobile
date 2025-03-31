import { Toaster } from '@/components/ui/toaster'
import { cn } from '@/lib/utils'
import type { Metadata } from 'next'
import { Mulish, Roboto } from 'next/font/google'
import NextTopLoader from 'nextjs-toploader'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import type React from 'react'

import '@/styles/globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import ReactQueryProvider from '@/providers/react-query'

const mulish = Mulish({
  weight: 'variable',
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
})

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn('overscroll-none', roboto.variable, mulish.variable)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextTopLoader showSpinner={false} />
          <ReactQueryProvider>
            <NuqsAdapter>{children}</NuqsAdapter>
          </ReactQueryProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  title: 'Webora Motors',
  description:
    'A Webora App to manage your car dealership with an AI assistant.',
}
