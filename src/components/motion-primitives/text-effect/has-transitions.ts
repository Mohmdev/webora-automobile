import type { TargetAndTransition, Transition, Variant } from 'motion/react'

export const hasTransition = (
  variant: Variant
): variant is TargetAndTransition & { transition?: Transition } => {
  return (
    typeof variant === 'object' && variant !== null && 'transition' in variant
  )
}
