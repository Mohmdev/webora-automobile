import { ThemeProvider } from '@/components/theme-provider'
import type { Favourites, PageProps } from '@/config/types'
import { redis } from '@/lib/redis-store'
import { getSourceId } from '@/lib/source-id'
import { getInventory } from './_data'
import { Archive } from './components/archive'

export default async function CatalogPage(props: PageProps) {
  const searchParams = await props.searchParams
  const classifieds = getInventory(searchParams)
  const sourceId = await getSourceId()
  const favourites = await redis.get<Favourites>(sourceId ?? '')

  const data = {
    classifieds,
    favourites: favourites ? favourites.ids : [],
  }

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <Archive {...data} />
    </ThemeProvider>
  )
}
