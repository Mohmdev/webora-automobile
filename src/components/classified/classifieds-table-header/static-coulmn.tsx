import { TableHead } from '../../ui/table'

interface StaticColumnProps {
  title: string
  width?: string | undefined
  hiddenOnMobile?: boolean | undefined
}

export function StaticColumn({
  title,
  width,
  hiddenOnMobile,
}: StaticColumnProps) {
  return (
    <TableHead
      className={`${width || ''} ${hiddenOnMobile ? 'hidden md:table-cell' : ''} text-muted`}
    >
      {title}
    </TableHead>
  )
}
