import { AnimatedGroup } from '@/components/motion-primitives/animated-group'
import { TextEffect } from '@/components/motion-primitives/text-effect'
import { routes } from '@/config/routes'
import { cn } from '@/lib/utils'
import { CTAButton } from './cta-button'
import { transitionVariants } from './variants'

export function Header({ className }: { className?: string }) {
  return (
    <div className={cn('mx-auto max-w-5xl px-6', className)}>
      <div className="sm:mx-auto lg:mt-0 lg:mr-auto">
        <TextEffect
          preset="fade-in-blur"
          speedSegment={0.3}
          as="h1"
          className="mt-8 max-w-2xl text-balance font-medium text-5xl md:text-6xl lg:mt-16"
        >
          Find your next car
        </TextEffect>
        <TextEffect
          per="line"
          preset="fade-in-blur"
          speedSegment={0.3}
          delay={0.5}
          as="p"
          className="mt-8 max-w-2xl text-pretty text-lg"
        >
          Our exclusive collection offers unmatched luxury and speed for the
          ultimate driving experience.
        </TextEffect>

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
          className="mt-12 flex items-center gap-2"
        >
          <CTAButton
            key={1}
            label="Browse our collection"
            href={routes.catalog}
            variant="shine"
            radius="sm"
          />
          <CTAButton
            key={2}
            label="Ask our AI"
            href={routes.contact}
            variant="ghost"
            radius="sm"
          />
        </AnimatedGroup>
      </div>
    </div>
  )
}
