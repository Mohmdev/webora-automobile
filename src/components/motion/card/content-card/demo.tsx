'use client'

import { imageSources } from '@/config/constants'
import { AuthorCard } from '.'

export function AuthorCardDemo() {
  return (
    <AuthorCard
      backgroundImage={imageSources.gClass13}
      author={{
        name: 'Manu Arora',
        avatar: imageSources.gClass17,
        readTime: '2 min read',
      }}
      content={{
        title: 'Author Card',
        description:
          'Card with Author avatar, complete name and time to read - most suitable for blogs.',
      }}
    />
  )
}
