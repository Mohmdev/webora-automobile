'use client'

import { FavouriteButton } from '@/components/shared/favourite-button'
import { HTMLParser } from '@/components/shared/html-parser'
import { ImgixImage } from '@/components/ui/imgix-image'
import { routes } from '@/config/routes'
import { useRecordData } from '@/hooks/record/use-record-data'
import { useRecordState } from '@/hooks/record/use-record-state'
import { cn } from '@/lib/utils'
import {
  type FavouritesProps,
  MultiStepFormEnum,
  type RecordDataProps,
} from '@/types'
import { AnimatePresence, motion } from 'motion/react'
import Link from 'next/link'
import { RecordCTA } from './record-cta'

export function Card1({
  record,
  favouriteIds = [],
  className,
}: RecordDataProps & FavouritesProps & { className?: string }) {
  if (!record) {
    return null
  }
  const { isFavourite, setIsFavourite, isVisible } = useRecordState(
    record,
    favouriteIds
  )
  const { formattedPrice, recordInfo } = useRecordData(record)

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className={cn(
            'overflow-hiddem relative flex flex-col rounded-md border bg-card shadow-md',
            className
          )}
        >
          <div className="relative aspect-3/2">
            <Link href={routes.singleClassified(record.slug)}>
              <ImgixImage
                placeholder="blur"
                blurDataURL={record.images[0]?.blurhash}
                src={record.images[0]?.src}
                alt={record.images[0]?.alt}
                className="rounded-t-md object-cover"
                fill={true}
                quality={25}
              />
            </Link>
            <FavouriteButton
              setIsFavourite={setIsFavourite}
              isFavourite={isFavourite}
              id={record.id}
            />
            <RecordCTA
              size="sm"
              className="absolute top-2.5 right-2.5 rounded-sm bg-[oklch(0.269_0_0)] text-white duration-300 ease-linear hover:bg-[oklch(0.269_0_0)]/60"
              label={formattedPrice}
              variant="unstyled"
            />
          </div>
          <div className="flex flex-col gap-3 p-4">
            <div className="flex flex-col gap-2">
              <Link
                href={routes.singleClassified(record.slug)}
                className="line-clamp-1 font-semibold text-sm transition-colors hover:text-primary md:text-base lg:text-lg"
              >
                {record.title}
              </Link>
              {record?.description && (
                <div className="line-clamp-2 text-gray-500 text-xs md:text-sm ">
                  <HTMLParser html={record.description} />
                  &nbsp;{' '}
                  {/* Used for equal spacing across each card in the grid */}
                </div>
              )}

              <ul className="grid w-full grid-cols-1 grid-rows-4 items-center justify-between text-gray-600 text-xs md:grid-cols-2 md:grid-rows-4 md:text-sm xl:flex">
                {recordInfo
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
            <div className="flex w-full flex-col space-y-2 lg:flex-row lg:gap-x-2 lg:space-y-0">
              <RecordCTA
                label="Reserve"
                href={routes.reserve(record.slug, MultiStepFormEnum.WELCOME)}
              />
              <RecordCTA
                label="View Details"
                isPrimary
                href={routes.singleClassified(record.slug)}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
