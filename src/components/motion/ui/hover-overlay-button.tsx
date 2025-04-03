import { Button } from '@/components/ui/button'
import { ChevronRight } from 'lucide-react'

export function HoverOverlayButton({ label }: { label: string }) {
  return (
    <Button className="group relative overflow-hidden" size="lg">
      <span className="mr-8 transition-opacity duration-500 group-hover:opacity-0">
        {label ? label : 'Get Started'}
      </span>
      <i className="absolute top-1 right-1 bottom-1 z-10 grid w-1/4 place-items-center rounded-sm bg-primary-foreground/15 text-black-500 transition-all duration-500 group-hover:w-[calc(100%-0.5rem)] group-active:scale-95">
        <ChevronRight size={16} strokeWidth={2} aria-hidden="true" />
      </i>
    </Button>
  )
}
