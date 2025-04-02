import { InfiniteSlider } from '@/components/motion-primitives/infinite-slider'
import { ProgressiveBlur } from '@/components/motion-primitives/progressive-blur'
import { cn } from '@/lib/utils'
import type React from 'react'

export function LogoCloud({
  children,
  className,
  enableStaticText = true,
  staticText = 'Powering the best teams',
}: {
  children: React.ReactNode
  className?: string
  enableStaticText?: boolean
  staticText?: string
}) {
  return (
    <section className={cn('overflow-hidden bg-background py-16', className)}>
      <div className="group relative m-auto max-w-7xl px-6">
        <div className="flex flex-col items-center md:flex-row">
          {enableStaticText && (
            <div className="md:max-w-44 md:border-r md:pr-6">
              <p className="text-end text-sm">{staticText}</p>
            </div>
          )}
          <div className="relative mx-auto py-6 md:w-[calc(100%-11rem)]">
            <InfiniteSlider speedOnHover={20} speed={40} gap={112}>
              {children}
            </InfiniteSlider>

            <div className="absolute inset-y-0 left-0 w-20 bg-linear-to-r from-background" />
            <div className="absolute inset-y-0 right-0 w-20 bg-linear-to-l from-background" />
            <ProgressiveBlur
              className="pointer-events-none absolute top-0 left-0 h-full w-20"
              direction="left"
              blurIntensity={1}
            />
            <ProgressiveBlur
              className="pointer-events-none absolute top-0 right-0 h-full w-20"
              direction="right"
              blurIntensity={1}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
