'use client'
import { cn } from '@/lib/utils'
import type { SearchAwaitedProps } from '@/types'
import type { ClassifiedStatus } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { Label } from '../ui/label'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'

type RadioMinMaxProps = SearchAwaitedProps & {
  items: string[]
}

export const RadioFilter = (props: RadioMinMaxProps) => {
  const { items, searchParams } = props
  const router = useRouter()
  const status = (searchParams?.status as string) || 'all'

  const handleStatus = (status: Lowercase<ClassifiedStatus>) => {
    const currentUrlParams = new URLSearchParams(window.location.search)
    currentUrlParams.set('status', status.toUpperCase())
    const url = new URL(window.location.href)
    url.search = currentUrlParams.toString()
    router.push(url.toString())
  }

  return (
    <RadioGroup
      onValueChange={handleStatus}
      defaultValue="all"
      className="flex items-center gap-4"
    >
      {items.map((item) => (
        <Label
          htmlFor={item.toLowerCase()}
          className={cn(
            'flex-1 cursor-pointer rounded-md px-4 py-2 text-center font-medium text-muted text-sm transition-colors hover:bg-primary-800',
            status?.toLowerCase() === item.toLowerCase() &&
              'bg-primary-800 text-white'
          )}
          key={item}
        >
          <RadioGroupItem
            id={item.toLowerCase()}
            value={item.toLowerCase()}
            checked={status?.toLowerCase() === item.toLowerCase()}
            className="peer sr-only"
          />
          {item}
        </Label>
      ))}
    </RadioGroup>
  )
}
