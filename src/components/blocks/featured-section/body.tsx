import { AnimatedGroup } from '@/components/motion-primitives/animated-group'
import { imageSources } from '@/config/constants'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { transitionVariants } from './variants'

export function Body({ className }: { className?: string }) {
  return (
    <AnimatedGroup
      variants={{
        container: {
          visible: {
            transition: {
              staggerChildren: 0.05,
              delayChildren: 0.75,
            },
          },
        },
        ...transitionVariants,
      }}
      className={cn('', className)}
    >
      <div className="-mr-56 relative mt-8 overflow-hidden px-2 sm:mt-12 sm:mr-0 md:mt-20 dark:border dark:border-border/25">
        <div
          aria-hidden
          className="absolute inset-0 z-10 bg-linear-to-b from-35% from-transparent to-background"
        />
        <div className="relative inset-shadow-2xs mx-auto aspect-15/8 w-full max-w-5xl overflow-hidden rounded-2xl border bg-background p-4 shadow-lg shadow-zinc-950/15 ring-1 ring-background dark:inset-shadow-white/20">
          <Image
            src={imageSources.gClass1}
            alt="image of a Mercedes-Benz G-Class"
            fill
            className="hidden object-cover dark:block"
          />
          <Image
            src={imageSources.gClass16}
            alt="image of a Mercedes-Benz G-Class"
            fill
            className="object-cover dark:hidden"
          />
        </div>
      </div>
    </AnimatedGroup>
  )
}
