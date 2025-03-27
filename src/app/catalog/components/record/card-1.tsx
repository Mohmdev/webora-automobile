'use client'

import { FavouriteButton } from '@/components/inventory/favourite-button'
import { HTMLParser } from '@/components/shared/html-parser'
import { ImgixImage } from '@/components/ui/imgix-image'
import { routes } from '@/config/routes'
import { MultiStepFormEnum } from '@/config/types'
import { cn } from '@/lib/utils'
import { AnimatePresence, motion } from 'motion/react'
import Link from 'next/link'
import { useRecordData, useRecordState } from './hooks'
import { CTA } from './shared'
import type { RecordProps } from './types'

export function Card1(props: RecordProps) {
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
            <CTA
              size="sm"
              className="absolute top-2.5 right-2.5 rounded-sm bg-accent shadow-sm backdrop-blur-sm duration-300 ease-linear hover:bg-accent/70"
              href="#"
              label={formattedPrice}
            />
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
                {classifiedInfo
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
