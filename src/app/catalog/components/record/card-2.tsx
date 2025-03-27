import { cn } from '@/lib/utils'

interface Card1Props {
  className?: string
}

export function Card1(props: Card1Props) {
  const { className } = props
  return (
    <>
      <div className={cn('aspect-square rounded-xl bg-muted/50', className)} />
    </>
  )
}
