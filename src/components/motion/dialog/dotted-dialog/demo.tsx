'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '.'

const MotionLogo = ({
  className,
  color = 'fill-yellow-300',
}: { className?: string; color?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    viewBox="0 0 905 317"
    aria-label="Motion Logo"
  >
    <title className="sr-only">Motion Logo</title>
    <path
      d="M341.711 0L162.9 316.721H0l139.623-247.308C161.267 31.077 215.278 0 260.261 0zm399.477 79.18c0-43.73 36.466-79.18 80.95-79.18 44.984 0 81.45 35.45 81.45 79.18 0 43.73-36.466 79.18-81.45 79.18-44.484 0-80.95-35.45-80.95-79.18zM372.255 0h162.9L356.344 316.721H193.444L372.255 0zm192.398 0h162.902L587.93 247.307c-21.643 38.337-75.655 69.414-120.638 69.414h-81.45L564.653 0z"
      className={color}
    />
  </svg>
)

export function DottedDialogDemo() {
  return (
    <div className="relative min-h-[500px] w-full">
      <header className="fixed top-0 right-0 left-0 z-50 flex items-center justify-between p-4">
        <div className="flex items-center gap-4">
          <MotionLogo className="h-[32px] w-[32px]" />
        </div>
        <nav className="flex gap-6 font-medium text-sm">
          <Link href="#" className="hover:text-gray-300">
            Docs
          </Link>
          <Link href="#" className="hover:text-gray-300">
            Examples
          </Link>
          <Link href="#" className="hover:text-gray-300">
            Motion+
          </Link>
        </nav>
      </header>

      <div className="flex min-h-[500px] flex-col items-center justify-center gap-10">
        <div className="mb-10 flex items-center gap-8">
          <div className="flex h-[150px] w-[150px] items-center justify-center rounded-full bg-yellow-300">
            <MotionLogo className="h-[100px] w-[100px]" color="fill-black" />
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="font-bold text-6xl text-yellow-300">Motion</h1>
            <p className="text-lg">
              A modern animation library for JavaScript and React
            </p>
          </div>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm">Open Dialog</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Dialog</DialogTitle>
              <DialogDescription>
                An example of Dialog with dotted overlay. This component
                demonstrates the custom styling and backdrop effect.
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
