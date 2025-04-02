import { fetchBrands } from '@/_data'
import { routes } from '@/config/routes'
import { cn } from '@/lib/utils'
import { BrandIcon } from './brand-icon'

export async function BrandsGrid({
  enablePopover = false,
  iconHeight = 'h-18',
}: { enablePopover?: boolean; iconHeight?: string }) {
  const brands = await fetchBrands()

  return (
    <div
      className={cn(
        'mx-auto mt-12 grid max-w-2xl grid-cols-4 items-center gap-x-12 gap-y-8 transition-all duration-500 sm:gap-x-16 sm:gap-y-14',
        enablePopover && 'group-hover:opacity-50 group-hover:blur-xs'
      )}
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
    </div>
  )
}
