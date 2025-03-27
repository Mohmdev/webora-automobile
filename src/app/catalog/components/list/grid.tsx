import { cn } from '@/lib/utils'
import { Record } from '../record'

interface GridListProps {
  className?: string
}

export function GridList(props: GridListProps) {
  const { className } = props
  return (
    <div className={cn('grid auto-rows-min gap-4 md:grid-cols-5', className)}>
      {Array.from({ length: 20 }).map((_, i) => (
        <Record key={i} template="card-1" />
      ))}
    </div>
  )
}
