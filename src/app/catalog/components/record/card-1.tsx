import { cn } from '@/lib/utils'

interface Card1Props {
  className?: string
  key?: number
}

export function Card1(props: Card1Props) {
  const { className, key } = props
  return (
    <>
      <div
        key={key}
        className={cn('aspect-square rounded-xl bg-muted/50', className)}
      />
    </>
  )
}
