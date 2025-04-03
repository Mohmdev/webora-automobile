'use client'

import { fetchBrands } from '@/_data'
import { IconCloud } from '@/components/motion/group/icon-cloud'
import { routes } from '@/config/routes'
import { useQuery } from '@tanstack/react-query'
import { BrandIcon } from './brand-icon'

export function BrandsMotionSlider({
  iconHeight = 'h-18',
  enableStaticText = true,
  staticText = 'Performance, Reliability, and Luxury',
  className,
}: {
  iconHeight?: string
  enableStaticText?: boolean
  staticText?: string
  className?: string
}) {
  const { data: brands } = useQuery({
    queryKey: ['brands'],
    queryFn: fetchBrands,
  })

  if (!brands) {
    return null
  }

  return (
    <IconCloud
      enableStaticText={enableStaticText}
      staticText={staticText}
      className={className}
    >
      {brands.map(({ id, image, name }) => (
        <BrandIcon
          key={id}
          enableLink={true}
          href={`${routes.catalog}?make=${id}`}
          iconSrc={image}
          alt={name}
          height={iconHeight}
        />
      ))}
    </IconCloud>
  )
}
