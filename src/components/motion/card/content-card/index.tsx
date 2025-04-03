'use client'

import { cn } from '@/lib/utils'
import Image from 'next/image'

interface AuthorCardProps {
  className?: string
  backgroundImage?: string
  author: {
    name: string
    avatar: string
    readTime?: string
  }
  content: {
    title: string
    description: string
  }
}

export const AuthorCard = ({
  className,
  backgroundImage,
  author,
  content,
}: AuthorCardProps) => {
  return (
    <div className="group/card w-full max-w-xs">
      <div
        className={cn(
          'card relative mx-auto flex h-96 max-w-sm cursor-pointer flex-col justify-between overflow-hidden rounded-md bg-cover p-4 shadow-xl',
          className
        )}
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute top-0 left-0 h-full w-full opacity-60 transition duration-300 group-hover/card:bg-black" />
        <div className="z-10 flex flex-row items-center space-x-4">
          <Image
            height={100}
            width={100}
            alt={`${author.name}'s avatar`}
            src={author.avatar}
            className="h-10 w-10 rounded-full border-2 object-cover"
          />
          <div className="flex flex-col">
            <p className="relative z-10 font-normal text-base text-gray-50">
              {author.name}
            </p>
            {author.readTime && (
              <p className="text-gray-400 text-sm">{author.readTime}</p>
            )}
          </div>
        </div>
        <div className="text content">
          <h1 className="relative z-10 font-bold text-gray-50 text-xl md:text-2xl">
            {content.title}
          </h1>
          <p className="relative z-10 my-4 font-normal text-gray-50 text-sm">
            {content.description}
          </p>
        </div>
      </div>
    </div>
  )
}
