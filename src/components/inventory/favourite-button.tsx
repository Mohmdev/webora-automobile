'use client'

import { endpoints } from '@/config/endpoints'
import { api } from '@/lib/api-client'
import { cn } from '@/lib/utils'
import { HeartIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Button } from '../ui/button'

type FavouriteButtonProps = {
  setIsFavourite: (isFavourite: boolean) => void
  isFavourite: boolean
  id: number
}

export const FavouriteButton = (props: FavouriteButtonProps) => {
  const { setIsFavourite, isFavourite, id } = props

  const router = useRouter()

  const handleFavourite = async () => {
    const { ids } = await api.post<{ ids: number[] }>(endpoints.favourites, {
      json: { id },
    })

    if (ids.includes(id)) {
      setIsFavourite(true)
    } else {
      setIsFavourite(false)
    }
    setTimeout(() => router.refresh(), 250)
  }

  return (
    <Button
      onClick={handleFavourite}
      variant="ghost"
      size="icon"
      className={cn(
        'group !h-6 !w-6 lg:!h-8 lg:!w-8 xl:!h-10 xl:!w-10 absolute top-2.5 left-3.5 z-10 rounded-full',
        isFavourite ? 'bg-white' : '!bg-muted/15'
      )}
    >
      <HeartIcon
        className={cn(
          'h-3.5 w-3.5 text-white transition-colors duration-200 ease-in-out lg:h-4 lg:w-4 xl:h-6 xl:w-6',
          isFavourite
            ? 'fill-pink-500 text-pink-500'
            : 'group-hover:fill-pink-500 group-hover:text-pink-500'
        )}
      />
    </Button>
  )
}
