'use client'

import { endpoints } from '@/config/endpoints'
import { api } from '@/lib/api-client'
import { cn } from '@/lib/utils'
import type { FavouriteButtonProps } from '@/types'
import { HeartIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Button } from '../ui/button'

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
      variant="unstyled"
      size="icon"
      className={cn(
        'group absolute top-2.5 left-2.5 z-10 size-max cursor-pointer rounded-full border-0 p-1.5 backdrop-blur-none duration-200 ease-linear hover:bg-accent/50',
        isFavourite && 'bg-accent/10 backdrop-blur-sm'
      )}
    >
      <HeartIcon
        className={cn(
          'size-4 text-white transition-colors duration-200 ease-in-out',
          isFavourite
            ? 'fill-pink-500 text-pink-500'
            : 'group-hover:fill-pink-500 group-hover:text-pink-500'
        )}
      />
    </Button>
  )
}
