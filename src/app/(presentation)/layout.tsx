import { PublicLayout } from '@/components/layouts/public-layout'
import { ThemeProvider } from '@/components/theme-provider'
import type { PropsWithChildren } from 'react'

export default function PresentationLayout(props: PropsWithChildren) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <PublicLayout>{props.children}</PublicLayout>
    </ThemeProvider>
  )
}
