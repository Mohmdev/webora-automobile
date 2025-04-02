import { imageSources } from '@/config/constants'
import { cn } from '@/lib/utils'
import Image from 'next/image'

export const FeaturesSection = ({ className }: { className?: string }) => {
  return (
    <div className={cn('my-8 flex flex-col gap-10 bg-background', className)}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-8xl sm:text-center">
          <h2 className="font-semibold text-base leading-7 md:text-2xl">
            We've got what you need
          </h2>
          <h2 className="mt-2 font-bold text-4xl text-foreground uppercase tracking-tight sm:text-8xl">
            No car? No problem
          </h2>
          <p className="mt-6 text-gray-600 text-lg leading-8">
            Our exclusive collection offers unmatched luxury and speed for the
            ultimate driving experience
          </p>
        </div>
      </div>
      <div className="relative h-[400px] overflow-hidden md:h-[600px] lg:h-[700px]">
        <Image
          src={imageSources.gClass16}
          alt="G-Class"
          fill
          className="mx-auto max-w-7xl scale-x-[-1] bg-bottom bg-no-repeat object-cover object-center shadow-2xl lg:rounded-t-xl"
        />

        <div
          aria-hidden="true"
          className="-inset-x-20 absolute bottom-0 bg-linear-to-t from-background to-transparent pt-[3%]"
        />
      </div>
    </div>
  )
}
