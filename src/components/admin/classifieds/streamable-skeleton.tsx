import type { ClassifiedAI } from "@/app/schemas/classified-ai.schema"
import { Skeleton } from "@/components/ui/skeleton"
import {
  formatBodyType,
  formatColour,
  formatFuelType,
  formatNumber,
  formatOdometerUnit,
  formatTransmission,
  formatUlezCompliance,
} from "@/lib/utils"
import type { Make } from "@prisma/client"
import {
  CarFrontIcon,
  CarIcon,
  CheckIcon,
  Fingerprint,
  FuelIcon,
  GaugeIcon,
  PowerIcon,
  UsersIcon,
  XIcon,
} from "lucide-react"
import Image from "next/image"

export type StreamableSkeletonProps = Partial<Omit<ClassifiedAI, "make">> & {
  make?: Make
  done?: boolean
}

export const StreamableSkeleton = (props: StreamableSkeletonProps) => {
  const {
    image,
    title,
    odoReading,
    fuelType,
    transmission,
    description,
    bodyType,
    seats,
    ulezCompliance,
    doors,
    colour,
    vrm,
    odoUnit,
    make,
    done,
  } = props
  return (
    <div className="container mx-auto flex flex-col py-12">
      <div className="flex flex-col md:flex-row">
        <div className="relative md:w-1/2">
          {image ? (
            <Image
              src={image}
              alt={title || "Vehicle Image"}
              width={600}
              height={400}
              className="aspect-3/2 rounded-lg object-cover"
            />
          ) : (
            <Skeleton className="aspect-3/2 w-full" />
          )}
        </div>
        <div className="mt-4 md:mt-0 md:w-1/2 md:pl-8">
          <div className="flex flex-col items-start md:flex-row md:items-center">
            {make ? (
              <Image
                src={make.image}
                alt={make.name}
                width={80}
                height={64}
                className="mr-4"
              />
            ) : done ? null : (
              <Skeleton className="mr-4 h-16 w-20" />
            )}
            <div>
              {title ? (
                <h1 className="font-bold text-2xl">{title}</h1>
              ) : (
                <Skeleton className="mb-2 h-8 w-64" />
              )}
            </div>
          </div>
          <div className="my-4 flex flex-wrap items-center gap-2">
            {odoReading && odoUnit ? (
              <span className="5 5 rounded-md bg-gray-200 px-2 py-0 font-medium text-gray-800 text-sm">
                {formatNumber(odoReading)} {formatOdometerUnit(odoUnit)}
              </span>
            ) : done ? null : (
              <Skeleton className="h-6 w-16 rounded-md" />
            )}
            {fuelType ? (
              <span className="5 5 rounded-md bg-gray-200 px-2 py-0 font-medium text-gray-800 text-sm">
                {formatFuelType(fuelType)}
              </span>
            ) : done ? null : (
              <Skeleton className="h-6 w-16 rounded-md" />
            )}
            {colour ? (
              <span className="5 5 rounded-md bg-gray-200 px-2 py-0 font-medium text-gray-800 text-sm">
                {formatColour(colour)}
              </span>
            ) : done ? null : (
              <Skeleton className="h-6 w-16 rounded-md" />
            )}
            {transmission ? (
              <span className="5 5 rounded-md bg-gray-200 px-2 py-0 font-medium text-gray-800 text-sm">
                {formatTransmission(transmission)}
              </span>
            ) : done ? null : (
              <Skeleton className="h-6 w-16 rounded-md" />
            )}
          </div>
          {description ? (
            <p className="mb-4 text-gray-600">{description}</p>
          ) : (
            <Skeleton className="mb-4 h-20 w-full" />
          )}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <div className="rounded-lg bg-gray-100 p-4 text-center shadow-xs">
              {ulezCompliance === "EXEMPT" ? (
                <CheckIcon className="mx-auto h-6 w-6 text-green-500" />
              ) : (
                <XIcon className="mx-auto h-6 w-6 text-red-500" />
              )}
              {ulezCompliance ? (
                <p className="mt-2 font-medium text-sm">
                  {formatUlezCompliance(ulezCompliance)}
                </p>
              ) : done ? (
                <p className="mt-2 font-medium text-sm">UNKNOWN</p>
              ) : (
                <Skeleton className="mx-auto mt-2 h-4 w-16" />
              )}
            </div>
            <div className="rounded-lg bg-gray-100 p-4 text-center shadow-xs">
              <Fingerprint className="mx-auto h-6 w-6 text-zinc-400" />
              {vrm ? (
                <p className="mt-2 font-medium text-sm">{vrm}</p>
              ) : done ? (
                <p className="mt-2 font-medium text-sm">UNKNOWN</p>
              ) : (
                <Skeleton className="mx-auto mt-2 h-4 w-16" />
              )}
            </div>
            <div className="rounded-lg bg-gray-100 p-4 text-center shadow-xs">
              <CarIcon className="mx-auto h-6 w-6 text-zinc-400" />
              {bodyType ? (
                <p className="mt-2 font-medium text-sm">
                  {formatBodyType(bodyType)}
                </p>
              ) : done ? (
                <p className="mt-2 font-medium text-sm">UNKNOWN</p>
              ) : (
                <Skeleton className="mx-auto mt-2 h-4 w-16" />
              )}
            </div>
            <div className="rounded-lg bg-gray-100 p-4 text-center shadow-xs">
              <FuelIcon className="mx-auto h-6 w-6 text-zinc-400" />
              {fuelType ? (
                <p className="mt-2 font-medium text-sm">
                  {formatFuelType(fuelType)}
                </p>
              ) : done ? (
                <p className="mt-2 font-medium text-sm">UNKNOWN</p>
              ) : (
                <Skeleton className="mx-auto mt-2 h-4 w-16" />
              )}
            </div>
            <div className="rounded-lg bg-gray-100 p-4 text-center shadow-xs">
              <PowerIcon className="mx-auto h-6 w-6 text-zinc-400" />
              {transmission ? (
                <p className="mt-2 font-medium text-sm">
                  {formatTransmission(transmission)}
                </p>
              ) : done ? (
                <p className="mt-2 font-medium text-sm">UNKNOWN</p>
              ) : (
                <Skeleton className="mx-auto mt-2 h-4 w-16" />
              )}
            </div>
            <div className="rounded-lg bg-gray-100 p-4 text-center shadow-xs">
              <GaugeIcon className="mx-auto h-6 w-6 text-zinc-400" />
              {odoReading && odoUnit ? (
                <p className="mt-2 font-medium text-sm">
                  {formatNumber(odoReading)} {formatOdometerUnit(odoUnit)}
                </p>
              ) : done ? (
                <p className="mt-2 font-medium text-sm">UNKNOWN</p>
              ) : (
                <Skeleton className="mx-auto mt-2 h-4 w-16" />
              )}
            </div>
            <div className="rounded-lg bg-gray-100 p-4 text-center shadow-xs">
              <UsersIcon className="mx-auto h-6 w-6 text-zinc-400" />
              {seats ? (
                <p className="mt-2 font-medium text-sm">{seats}</p>
              ) : done ? (
                <p className="mt-2 font-medium text-sm">UNKNOWN</p>
              ) : (
                <Skeleton className="mx-auto mt-2 h-4 w-16" />
              )}
            </div>
            <div className="rounded-lg bg-gray-100 p-4 text-center shadow-xs">
              <CarFrontIcon className="mx-auto h-6 w-6 text-zinc-400" />
              {doors ? (
                <p className="mt-2 font-medium text-sm">{doors}</p>
              ) : done ? (
                <p className="mt-2 font-medium text-sm">UNKNOWN</p>
              ) : (
                <Skeleton className="mx-auto mt-2 h-4 w-16" />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
