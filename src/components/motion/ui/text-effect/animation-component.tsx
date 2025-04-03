'use client'

import { cn } from '@/lib/utils'
import { type Variants, motion } from 'motion/react'
import React from 'react'

export const AnimationComponent: React.FC<{
  segment: string
  variants: Variants
  per: 'line' | 'word' | 'char'
  segmentWrapperClassName?: string
}> = React.memo(({ segment, variants, per, segmentWrapperClassName }) => {
  let content: React.ReactNode

  if (per === 'line') {
    content = (
      <motion.span variants={variants} className="block">
        {segment}
      </motion.span>
    )
  } else if (per === 'word') {
    content = (
      <motion.span
        aria-hidden="true"
        variants={variants}
        className="inline-block whitespace-pre"
      >
        {segment}
      </motion.span>
    )
  } else {
    content = (
      <motion.span className="inline-block whitespace-pre">
        {segment.split('').map((char, charIndex) => (
          <motion.span
            key={`char-${charIndex}`}
            aria-hidden="true"
            variants={variants}
            className="inline-block whitespace-pre"
          >
            {char}
          </motion.span>
        ))}
      </motion.span>
    )
  }

  if (!segmentWrapperClassName) {
    return content
  }

  const defaultWrapperClassName = per === 'line' ? 'block' : 'inline-block'

  return (
    <span className={cn(defaultWrapperClassName, segmentWrapperClassName)}>
      {content}
    </span>
  )
})

AnimationComponent.displayName = 'AnimationComponent'
