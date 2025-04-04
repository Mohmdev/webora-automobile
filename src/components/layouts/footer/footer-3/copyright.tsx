import { ThemeToggle } from '@/components/ui/theme-toggle'
import { cn } from '@/lib/utils'
import { ChevronsUpDown } from 'lucide-react'

export function Copyright() {
  return (
    <div className="mt-12 flex flex-wrap items-end justify-between gap-6 border-t py-6">
      <small className="order-last block text-center text-muted-foreground text-sm md:order-first">
        © {new Date().getFullYear()} Tailus UI, All rights reserved
      </small>
      <div className="flex items-center gap-2">
        <ThemeToggle className="bg-transparent!" />
        <form action="">
          <div className="relative">
            <ChevronsUpDown
              className="pointer-events-none absolute inset-y-0 right-2 my-auto opacity-75"
              size="0.75rem"
            />
            <select
              className={cn(
                'flex h-9 w-full min-w-32 appearance-none rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs outline-none transition-[color,box-shadow] selection:bg-primary selection:text-primary-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:font-medium file:text-foreground file:text-sm placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
                'focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50',
                'aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40'
              )}
              name="language"
            >
              <option value="1">English</option>
              <option value="2">Espanol</option>
              <option value="3">Français</option>
              <option value="4">Swahili</option>
              <option value="5">Lingala</option>
            </select>
          </div>
        </form>
      </div>
    </div>
  )
}
