import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'

export function BrandIcon({
  className,
  alt,
  iconSrc,
  height,
  iconClassName,
  enableLink = false,
  href,
}: {
  alt: string
  className?: string
  iconSrc: string
  height?: string
  iconClassName?: string
  enableLink?: boolean
  href?: string
}) {
  return (
    <div
      className={cn(
        'relative transition-all duration-300 ease-in-out hover:scale-110',
        height ? height : 'h-10',
        className
      )}
    >
      {enableLink === false ? (
        <Image
          src={iconSrc}
          alt={alt}
          fill
          className={cn('min-h-min min-w-fit', iconClassName)}
        />
      ) : (
        <Link href={href ?? '#'} className="h-[inherit]">
          <Image
            src={iconSrc}
            alt={alt}
            fill
            className={cn('min-h-min min-w-fit', iconClassName)}
          />
        </Link>
      )}
    </div>
  )
}
