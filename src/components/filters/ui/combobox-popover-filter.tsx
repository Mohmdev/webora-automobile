'use client'

import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useFilters } from '@/hooks/filters/use-filters'
import { useIsMobile } from '@/hooks/use-mobile'
import type { ResolvedParams } from '@/types'
import { type LucideIcon, X } from 'lucide-react'
import * as React from 'react'

export type FilterOption = {
  optionValue: string
  optionLabel: string
}

export interface ComboboxPopoverFilterProps extends ResolvedParams {
  name: string
  label: string
  placeholder?: string
  options: FilterOption[]
  icon?: LucideIcon
  emptyMessage?: string
  clearLabel?: string
}

export function ComboboxPopoverFilter({
  searchParams,
  name,
  label,
  placeholder = 'Search...',
  options,
  icon: Icon,
  emptyMessage = 'No results found.',
  clearLabel = 'Clear selection',
}: ComboboxPopoverFilterProps) {
  const { queryStates, handleSelectChange } = useFilters(
    searchParams as Record<string, string>
  )

  const isMobile = useIsMobile()
  const [open, setOpen] = React.useState(false)
  const [selectedOption, setSelectedOption] =
    React.useState<FilterOption | null>(null)

  // Initialize selected option from URL query params
  React.useEffect(() => {
    // Type-safe access to queryStates with dynamic key
    const currentValue = (queryStates as Record<string, string | undefined>)[
      name
    ]

    if (currentValue) {
      setSelectedOption(
        options.find((option) => option.optionValue === currentValue) || null
      )
    } else {
      setSelectedOption(null)
    }
  }, [queryStates, name, options])

  return (
    <div className="flex w-full flex-row flex-nowrap items-center space-x-2">
      {Icon && (
        <div className="w-max">
          <Icon className="mx-auto h-6 w-6 text-gray-500" />
        </div>
      )}
      <div className="inline-flex w-full">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full rounded-sm">
              {selectedOption ? (
                <>{selectedOption.optionLabel}</>
              ) : (
                <>{label}</>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent
            side={isMobile ? 'bottom' : 'right'}
            align="start"
            sideOffset={5}
            avoidCollisions
            collisionPadding={5}
            sticky="always"
            className="max-w-54 p-0"
          >
            <Command>
              <CommandInput placeholder={placeholder} />
              <CommandList className="max-h-[60vh]">
                <CommandEmpty>{emptyMessage}</CommandEmpty>
                {selectedOption && (
                  <>
                    <CommandGroup>
                      <CommandItem
                        value="none"
                        className="text-muted-foreground"
                        onSelect={() => {
                          setSelectedOption(null)
                          handleSelectChange(name, '')
                          setOpen(false)
                        }}
                      >
                        <X className="mr-2 h-4 w-4" />
                        {clearLabel}
                      </CommandItem>
                    </CommandGroup>
                    <CommandSeparator />
                  </>
                )}
                <CommandGroup>
                  {options.map((option) => (
                    <CommandItem
                      key={option.optionValue}
                      value={option.optionValue}
                      onSelect={(value) => {
                        const selectedOption =
                          options.find(
                            (option) => option.optionValue === value
                          ) || null
                        setSelectedOption(selectedOption)
                        handleSelectChange(name, value)
                        setOpen(false)
                      }}
                    >
                      {option.optionLabel}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}
