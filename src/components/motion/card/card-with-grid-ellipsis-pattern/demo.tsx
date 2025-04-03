'use client'

import { GridPatternCard, GridPatternCardBody } from '.'

export function GridPatternCardDemo() {
  return (
    <GridPatternCard>
      <GridPatternCardBody>
        <h3 className="mb-1 font-bold text-foreground text-lg">
          Grid Pattern with Ellipsis
        </h3>
        <p className="text-wrap text-foreground/60 text-sm">
          A sophisticated pattern combining grid layout with ellipsis dots.
          Perfect for creating depth and visual interest while maintaining
          readability and modern aesthetics.
        </p>
      </GridPatternCardBody>
    </GridPatternCard>
  )
}
