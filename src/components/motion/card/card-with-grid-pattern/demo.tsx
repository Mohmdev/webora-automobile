import { GridPatternCard, GridPatternCardBody } from '.'

export function GridPatternCardDemo() {
  return (
    <GridPatternCard>
      <GridPatternCardBody>
        <h3 className="mb-1 font-bold text-foreground text-lg">
          Square Grid Pattern
        </h3>
        <p className="text-wrap text-foreground/60 text-sm">
          A clean and structured pattern featuring a grid of squares. The
          minimal design creates a subtle texture that adds depth without
          overwhelming the content.
        </p>
      </GridPatternCardBody>
    </GridPatternCard>
  )
}
