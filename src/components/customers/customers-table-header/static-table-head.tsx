interface StaticTableHeadProps {
  label: string
  width?: string
  className?: string
  hidden?: boolean
}

export const StaticTableHead = ({
  label,
  width = '',
  className = '',
  hidden = false,
}: StaticTableHeadProps) => {
  const baseClass = `${width} text-muted ${hidden ? 'hidden md:table-cell' : ''} ${className}`

  return <th className={baseClass}>{label}</th>
}
