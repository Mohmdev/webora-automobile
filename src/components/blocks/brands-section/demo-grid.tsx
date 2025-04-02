import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'

export function DemoIconSet({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'mx-auto mt-12 grid max-w-2xl grid-cols-4 items-center gap-x-12 gap-y-8 transition-all duration-500 group-hover:opacity-50 group-hover:blur-xs sm:gap-x-16 sm:gap-y-14',
        className
      )}
    >
      <Icon
        iconSrc="https://html.tailus.io/blocks/customers/nvidia.svg"
        alt="Nvidia Logo"
        className="h-5"
      />
      <Icon
        iconSrc="https://html.tailus.io/blocks/customers/column.svg"
        alt="Column Logo"
        className="h-4"
      />
      <Icon
        iconSrc="https://html.tailus.io/blocks/customers/github.svg"
        alt="GitHub Logo"
        className="h-4"
      />
      <Icon
        iconSrc="https://html.tailus.io/blocks/customers/nike.svg"
        alt="Nike Logo"
        className="h-5"
      />
      <Icon
        iconSrc="https://html.tailus.io/blocks/customers/lemonsqueezy.svg"
        alt="Lemon Squeezy Logo"
        className="h-5"
      />
      <Icon
        iconSrc="https://html.tailus.io/blocks/customers/laravel.svg"
        alt="Laravel Logo"
        className="h-4"
      />
      <Icon
        iconSrc="https://html.tailus.io/blocks/customers/lilly.svg"
        alt="Lilly Logo"
        className="h-7"
      />
      <Icon
        iconSrc="https://html.tailus.io/blocks/customers/openai.svg"
        alt="OpenAI Logo"
        className="h-6"
      />
    </div>
  )
}

function Icon({
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
