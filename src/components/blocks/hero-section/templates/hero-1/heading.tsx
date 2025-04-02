import { cn } from '@/lib/utils'

export function HeroHeading({
  h1,
  h2,
  className,
}: {
  h1?: string
  h2?: string
  className?: string
}) {
  return (
    <div className={cn('px-10 lg:px-0', className)}>
      <h1 className="text-center font-extrabold text-2xl text-white uppercase md:text-4xl lg:text-left lg:text-8xl">
        {h1 ? h1 : 'Unbeatable Deals on New & Used Cars'}
      </h1>
      <h2 className="mt-4 text-center text-base text-white uppercase md:text-3xl lg:text-left lg:text-4xl">
        {h2 ? h2 : 'Discover your dream car today'}
      </h2>
    </div>
  )
}
