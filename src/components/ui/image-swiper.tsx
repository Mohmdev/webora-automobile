import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { motion, useMotionValue } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import * as React from 'react'
import { ImgixImage } from './imgix-image'

interface ImageSwiperProps extends React.HTMLAttributes<HTMLDivElement> {
  images: string[]
  blurhash: string
  alt: string
  fill?: boolean
  quality?: number
  placeholder?: 'blur' | 'empty'
  className?: string
}

export function ImageSwiper({
  images,
  blurhash,
  alt,
  className,
  fill = true,
  quality = 25,
  placeholder = 'blur',
  ...props
}: ImageSwiperProps) {
  const [imgIndex, setImgIndex] = React.useState(0)
  const dragX = useMotionValue(0)

  const onDragEnd = () => {
    const x = dragX.get()
    if (x <= -10 && imgIndex < images.length - 1) {
      setImgIndex((prev) => prev + 1)
    } else if (x >= 10 && imgIndex > 0) {
      setImgIndex((prev) => prev - 1)
    }
  }

  return (
    <div
      className={cn(
        'group relative aspect-square h-full w-full overflow-hidden rounded-[inherit]',
        className
      )}
      {...props}
    >
      <div className="pointer-events-none absolute inset-0 z-10">
        {/* Left Indicator */}
        {imgIndex > 0 && (
          <Button
            variant="unstyled"
            size="icon"
            className="-translate-y-1/2 pointer-events-auto absolute top-1/2 left-3 grid size-6 cursor-pointer place-items-center rounded-full bg-accent/10 p-0.5 opacity-0 backdrop-blur-lg transition-all duration-200 ease-linear hover:bg-white/50 group-hover:opacity-100"
            onClick={() => setImgIndex((prev) => prev - 1)}
          >
            <ChevronLeft className="size-full text-white" />
          </Button>
        )}

        {/* Right Indicator */}
        {imgIndex < images.length - 1 && (
          <Button
            variant="unstyled"
            size="icon"
            className="-translate-y-1/2 pointer-events-auto absolute top-1/2 right-3 grid size-6 cursor-pointer place-items-center rounded-full bg-accent/10 p-0.5 opacity-0 backdrop-blur-lg transition-all duration-200 ease-linear hover:bg-white/50 group-hover:opacity-100"
            onClick={() => setImgIndex((prev) => prev + 1)}
          >
            <ChevronRight className="size-full text-white" />
          </Button>
        )}

        {/* Image Index */}
        <div className="pointer-events-none absolute bottom-2 flex w-full justify-center">
          <div className="flex min-w-9 items-center justify-center rounded-md bg-black/80 px-2 py-0.5 text-white text-xs opacity-0 transition-all duration-200 ease-linear group-hover:opacity-100">
            {imgIndex + 1}/{images.length}
          </div>
        </div>
      </div>

      <motion.div
        drag="x"
        dragConstraints={{
          left: 0,
          right: 0,
        }}
        dragMomentum={false}
        style={{
          x: dragX,
        }}
        animate={{
          translateX: `-${imgIndex * 100}%`,
        }}
        onDragEnd={onDragEnd}
        transition={{
          damping: 18,
          stiffness: 90,
          type: 'spring',
          duration: 0.2,
        }}
        className="flex h-full cursor-grab items-center rounded-[inherit] active:cursor-grabbing"
      >
        {images.map((src, i) => {
          return (
            <motion.div
              key={i}
              className="relative size-full shrink-0 overflow-hidden bg-neutral-800 object-cover first:rounded-l-[inherit] last:rounded-r-[inherit]"
            >
              <ImgixImage
                src={src}
                className="pointer-events-none size-full rounded-[inherit] object-cover"
                placeholder={placeholder}
                blurDataURL={blurhash}
                alt={alt}
                fill={fill}
                quality={quality}
              />
            </motion.div>
          )
        })}
      </motion.div>
    </div>
  )
}
