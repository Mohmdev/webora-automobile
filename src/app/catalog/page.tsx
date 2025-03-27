import { ThemeProvider } from '@/components/theme-provider'
import { Archive } from './components/archive'

export default function CatalogPage() {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <Archive />
    </ThemeProvider>
  )
}
