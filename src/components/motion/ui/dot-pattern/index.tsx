import { useId } from 'react'

import { cn } from '@/lib/utils'

interface DotPatternProps {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  width?: any
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  height?: any
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  x?: any
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  y?: any
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  cx?: any
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  cy?: any
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  cr?: any
  className?: string
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  [key: string]: any
}
export function DotPattern({
  width = 24,
  height = 24,
  x = 0,
  y = 0,
  cx = 1,
  cy = 0.5,
  cr = 0.5,
  className,
  ...props
}: DotPatternProps) {
  const id = useId()

  return (
    <svg
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute inset-0 h-full w-full fill-slate-500/50 md:fill-slate-500/70',
        className
      )}
      {...props}
    >
      <defs>
        <pattern
          id={id}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          patternContentUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <circle id="pattern-circle" cx={cx} cy={cy} r={cr} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${id})`} />
    </svg>
  )
}

export default DotPattern
