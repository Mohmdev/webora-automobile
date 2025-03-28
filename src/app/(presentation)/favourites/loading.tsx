import { ListRecords } from '@/components/catalog/list'

export default function FavouritesLoadingPage() {
  return (
    <div className="container mx-auto min-h-[80dvh] px-4 py-8">
      <h1 className="mb-6 font-bold text-3xl">Your Favourite Classifieds</h1>
      <ListRecords template="skeleton-1" />
    </div>
  )
}
