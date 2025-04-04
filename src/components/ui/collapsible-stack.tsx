'use client'

import { cn } from '@/lib/utils'
import { ChevronRight } from 'lucide-react'
import { AnimatePresence, type HTMLMotionProps, motion } from 'motion/react'
import type React from 'react'
import { createContext, forwardRef, useContext, useId, useState } from 'react'

interface CollapsibleContextProps {
  isOpen: boolean
  toggleOpen: () => void
  contentId: string
}

const CollapsibleContext = createContext<CollapsibleContextProps | undefined>(
  undefined
)

function useCollapsibleContext() {
  const context = useContext(CollapsibleContext)
  if (!context) {
    throw new Error(
      'useCollapsibleContext must be used within a <Collapsible> component'
    )
  }
  return context
}

interface CollapsibleProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultOpen?: boolean
}

const Collapsible = forwardRef<HTMLDivElement, CollapsibleProps>(
  ({ children, className, defaultOpen = true, ...props }, ref) => {
    const [isOpen, setIsOpen] = useState(defaultOpen)
    const contentId = useId()

    const toggleOpen = () => setIsOpen((prev) => !prev)

    return (
      <CollapsibleContext.Provider value={{ isOpen, toggleOpen, contentId }}>
        <div
          ref={ref}
          className={cn('flex flex-col', className)}
          data-state={isOpen ? 'open' : 'closed'}
          {...props}
        >
          {children}
        </div>
      </CollapsibleContext.Provider>
    )
  }
)
Collapsible.displayName = 'Collapsible'

interface CollapsibleTriggerProps
  extends Omit<HTMLMotionProps<'div'>, 'onClick' | 'children'> {
  children?: React.ReactNode
  icon?: React.ElementType
  asChild?: boolean
  triggerLabel?: string // Optional: Keep for convenience if needed
}

const CollapsibleTrigger = forwardRef<
  React.ElementRef<typeof motion.div>,
  CollapsibleTriggerProps
>(
  (
    {
      children,
      className,
      icon: Icon,
      asChild = false,
      triggerLabel,
      ...props
    },
    ref
  ) => {
    const { isOpen, toggleOpen, contentId } = useCollapsibleContext()
    const Comp = asChild ? motion.div : motion.div // Could use Slot from Radix if needed

    return (
      <Comp
        ref={ref}
        className={cn(
          'flex cursor-pointer items-center justify-between',
          className
        )}
        onClick={toggleOpen}
        whileTap={{ scale: 0.98 }}
        aria-expanded={isOpen}
        aria-controls={contentId}
        {...props}
      >
        <div className="inline-flex items-center justify-start">
          {Icon && <Icon className="mr-2 ml-0 h-4 w-4 flex-shrink-0" />}
          {triggerLabel ? <p>{triggerLabel}</p> : children}
        </div>
        <motion.div
          initial={false}
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronRight className="mr-0 h-4 w-4" />
        </motion.div>
      </Comp>
    )
  }
)
CollapsibleTrigger.displayName = 'CollapsibleTrigger'

interface CollapsibleContentProps
  extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children?: React.ReactNode
}

const CollapsibleContent = forwardRef<
  React.ElementRef<typeof motion.div>,
  CollapsibleContentProps
>(({ children, className, ...props }, ref) => {
  const { isOpen, contentId } = useCollapsibleContext()

  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          id={contentId}
          ref={ref}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className={cn('overflow-hidden', className)}
          {...props}
        >
          {/* Optional padding/margin can be added here or via className */}
          <div className="mt-2 space-y-3 px-2 pt-2 pb-1">{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
  )
})
CollapsibleContent.displayName = 'CollapsibleContent'

export { Collapsible, CollapsibleTrigger, CollapsibleContent }
