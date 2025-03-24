import { Skeleton } from '@/components/ui/skeleton'
import type { Make } from '@prisma/client'
import Image from 'next/image'

export function HeaderSection({
  make,
  title,
  done,
}: {
  make: Make | null | undefined
  title: string | undefined
  done: boolean | undefined
}) {
  return (
    <div className="flex flex-col items-start md:flex-row md:items-center">
      {make && make.name !== 'UNKNOWN' && (
        <Image
          src={make.image}
          alt={make.name}
          width={80}
          height={64}
          className="mr-4"
        />
      )}
      {(!make || make.name === 'UNKNOWN') && !done && (
        <Skeleton className="mr-4 h-16 w-20" />
      )}
      <div>
        {title ? (
          <h1 className="font-bold text-2xl">{title.trim()}</h1>
        ) : (
          <Skeleton className="mb-2 h-8 w-64" />
        )}
      </div>
    </div>
  )
}
