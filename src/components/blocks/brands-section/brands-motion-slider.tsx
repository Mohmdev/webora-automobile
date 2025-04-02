import { fetchBrands } from '@/_data'
import { routes } from '@/config/routes'
import { LogoCloud } from '../logo-cloud'
import { BrandIcon } from './brand-icon'

export async function BrandsMotionSlider({
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
  const brands = await fetchBrands()

  return (
    <LogoCloud
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
    </LogoCloud>
  )
}
