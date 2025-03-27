'use client'

import { FavouriteButton } from '@/components/inventory/favourite-button'
import { HTMLParser } from '@/components/shared/html-parser'
import { Button, type ButtonProps } from '@/components/ui/button'
import { ImgixImage } from '@/components/ui/imgix-image'
import { routes } from '@/config/routes'
import { type ClassifiedWithImages, MultiStepFormEnum } from '@/config/types'
import {
  cn,
  formatColour,
  formatFuelType,
  formatNumber,
  formatOdometerUnit,
  formatPrice,
  formatTransmission,
} from '@/lib/utils'
import { Cog, Fuel, GaugeCircle, Paintbrush2 } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import type { RecordProps } from '.'

export function Card1(props: RecordProps) {
  const { classified, favourites, className } = props

  const pathname = usePathname()
  const [isFavourite, setIsFavourite] = useState(
    favourites.includes(classified.id)
  )
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    if (!isFavourite && pathname === routes.favourites) {
      setIsVisible(false)
    }
  }, [isFavourite, pathname])

  const formattedPrice = formatPrice({
    price: classified.price,
    currency: classified.currency,
  })

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className={cn(
            'overflow-hiddem relative flex flex-col rounded-md bg-white shadow-md',
            className
          )}
        >
          <div className="relative aspect-3/2">
            <Link href={routes.singleClassified(classified.slug)}>
              <ImgixImage
                placeholder="blur"
                blurDataURL={classified.images[0]?.blurhash}
                src={classified.images[0]?.src}
                alt={classified.images[0]?.alt}
                className="rounded-t-md object-cover"
                fill={true}
                quality={25}
              />
            </Link>
            <FavouriteButton
              setIsFavourite={setIsFavourite}
              isFavourite={isFavourite}
              id={classified.id}
            />
            <Button
              size="sm"
              className="absolute top-2.5 right-2.5 rounded-sm bg-accent shadow-sm backdrop-blur-sm duration-300 ease-linear hover:bg-accent/70"
            >
              <p className="font-semibold text-foreground/80 text-xs lg:text-base">
                {formattedPrice}
              </p>
            </Button>
          </div>
          <div className="flex flex-col gap-3 p-4">
            <div className="flex flex-col gap-2">
              <Link
                href={routes.singleClassified(classified.slug)}
                className="line-clamp-1 font-semibold text-sm transition-colors hover:text-primary md:text-base lg:text-lg"
              >
                {classified.title}
              </Link>
              {classified?.description && (
                <div className="line-clamp-2 text-gray-500 text-xs md:text-sm ">
                  <HTMLParser html={classified.description} />
                  &nbsp;{' '}
                  {/* Used for equal spacing across each card in the grid */}
                </div>
              )}

              <ul className="grid w-full grid-cols-1 grid-rows-4 items-center justify-between text-gray-600 text-xs md:grid-cols-2 md:grid-rows-4 md:text-sm xl:flex">
                {getKeyClassifiedInfo(classified)
                  .filter((v) => v.value)
                  .map(({ id, icon, value }) => (
                    <li
                      key={id}
                      className="flex items-center gap-x-1.5 font-semibold xl:flex-col"
                    >
                      {icon} {value}
                    </li>
                  ))}
              </ul>
            </div>
            <div className=" flex w-full flex-col space-y-2 lg:flex-row lg:gap-x-2 lg:space-y-0">
              <CTA
                label="Reserve"
                href={routes.reserve(
                  classified.slug,
                  MultiStepFormEnum.WELCOME
                )}
              />
              <CTA
                label="View Details"
                isPrimary
                href={routes.singleClassified(classified.slug)}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

const CTA = ({
  href,
  label,
  isPrimary = false,
  className,
  ...props
}: ButtonProps & { href: string; label: string; isPrimary?: boolean }) => {
  return (
    <Button
      className={cn(
        'flex-1 text-xs md:text-sm xl:text-base',
        isPrimary
          ? ''
          : 'transition-colors hover:border-white hover:bg-primary hover:text-white',
        className
      )}
      asChild
      variant={isPrimary ? 'default' : 'outline'}
      size="sm"
      {...props}
    >
      <Link href={href}>{label}</Link>
    </Button>
  )
}

const getKeyClassifiedInfo = (classified: ClassifiedWithImages) => {
  return [
    {
      id: 'odoReading',
      icon: <GaugeCircle className="h-4 w-4" />,
      value: `${formatNumber(classified.odoReading)} ${formatOdometerUnit(classified.odoUnit)}`,
    },
    {
      id: 'transmission',
      icon: <Cog className="h-4 w-4" />,
      value: classified?.transmission
        ? formatTransmission(classified?.transmission)
        : null,
    },
    {
      id: 'fuelType',
      icon: <Fuel className="h-4 w-4" />,
      value: classified?.fuelType ? formatFuelType(classified.fuelType) : null,
    },
    {
      id: 'colour',
      icon: <Paintbrush2 className="h-4 w-4" />,
      value: classified?.colour ? formatColour(classified.colour) : null,
    },
  ]
}
