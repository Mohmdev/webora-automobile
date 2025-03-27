'use client'

import { FavouriteButton } from '@/components/inventory/favourite-button'
import { HTMLParser } from '@/components/shared/html-parser'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ImageSwiper } from '@/components/ui/image-swiper'
import { routes } from '@/config/routes'
import { MultiStepFormEnum } from '@/config/types'
import { AnimatePresence, motion } from 'motion/react'
import Link from 'next/link'
import { useRecordData, useRecordState } from './hooks'
import { CTA } from './shared'
import type { RecordProps } from './types'

export function Card2(props: RecordProps) {
  const { classified, favourites, className } = props
  const { isFavourite, setIsFavourite, isVisible } = useRecordState(
    classified,
    favourites
  )
  const { formattedPrice, classifiedInfo } = useRecordData(classified)

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="flex-1"
        >
          <Card className="overflow-hidden rounded-sm border-1 shadow-sm transition-all duration-200 ease-linear focus-within:shadow-lg hover:shadow-lg focus:shadow-lg focus-visible:shadow-lg">
            <div className="relative aspect-3/2 overflow-hidden rounded-b-[inherit]">
              <ImageSwiper
                placeholder="blur"
                images={classified.images.map((image) => image.src)}
                blurhash={classified.images[0]?.blurhash}
                alt={classified.images[0]?.alt}
                className="rounded-none border-none object-cover"
                fill={true}
                quality={25}
              />
              <FavouriteButton
                setIsFavourite={setIsFavourite}
                isFavourite={isFavourite}
                id={classified.id}
              />
            </div>

            <CardHeader>
              <CardTitle className="font-medium text-lg transition-colors hover:text-primary">
                <div className="flex flex-row flex-nowrap items-center justify-between gap-2">
                  <Link
                    href={routes.singleClassified(classified.slug)}
                    className="line-clamp-1"
                  >
                    {classified.title}
                  </Link>
                  <span className="text-nowrap font-body">
                    {formattedPrice && formattedPrice !== '0'
                      ? formattedPrice
                      : 'Price on request'}
                  </span>
                </div>
              </CardTitle>

              <ul className="flex w-full flex-wrap justify-between gap-1 text-muted-foreground text-xs">
                {classifiedInfo
                  .filter((v) => v.value)
                  .map(({ id, icon, value }) => (
                    <li key={id} className="flex items-center gap-1.5">
                      {icon} {value}
                    </li>
                  ))}
              </ul>

              {/* <span className="mt-1 flex-1 font-body font-medium text-base">
                {formattedPrice && formattedPrice !== '0'
                  ? formattedPrice
                  : 'Price on request'}
              </span> */}
            </CardHeader>
            <CardContent className="">
              {classified?.description && (
                <div className="line-clamp-2 text-muted-foreground text-xs">
                  <HTMLParser html={classified.description} />
                  &nbsp;{' '}
                  {/* Used for equal spacing across each card in the grid */}
                </div>
              )}
            </CardContent>

            <CardFooter className="flex w-full flex-wrap justify-between gap-2">
              <CTA
                label="Reserve"
                href={routes.reserve(
                  classified.slug,
                  MultiStepFormEnum.WELCOME
                )}
                className="rounded-sm"
              />
              <CTA
                label="View Details"
                isPrimary
                href={routes.singleClassified(classified.slug)}
                className="rounded-sm text-sm"
              />
            </CardFooter>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
