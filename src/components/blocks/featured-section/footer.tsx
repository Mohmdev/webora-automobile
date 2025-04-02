import { cn } from '@/lib/utils'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { BrandsMotionSlider } from '../brands-section/brands-motion-slider'

export function Footer({
  linkLabel = 'Meet Our Customers',
  linkHref = '/',
  enablePopover = false,
  className,
}: {
  linkLabel?: string
  linkHref?: string
  enablePopover?: boolean
  className?: string
}) {
  return (
    <section className={cn('bg-background pt-16 pb-16 md:pb-32', className)}>
      <div className="group relative m-auto max-w-5xl px-6">
        {enablePopover && (
          <div className="absolute inset-0 z-10 flex scale-95 items-center justify-center opacity-0 duration-500 group-hover:scale-100 group-hover:opacity-100">
            <Link
              href={linkHref}
              className="block text-sm duration-150 hover:opacity-75"
            >
              <span>{linkLabel}</span>

              <ChevronRight className="ml-1 inline-block size-3" />
            </Link>
          </div>
        )}
        <BrandsMotionSlider iconHeight="h-18" enableStaticText={true} />
      </div>
    </section>
  )
}
