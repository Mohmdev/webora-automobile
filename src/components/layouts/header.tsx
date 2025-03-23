import { auth } from '@/auth'
import { navLinks } from '@/config/constants'
import { routes } from '@/config/routes'
import type { Favourites } from '@/config/types'
import { redis } from '@/lib/redis-store'
import { getSourceId } from '@/lib/source-id'
import { HeartIcon, MenuIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { SignOutForm } from '../auth/sign-out-form'
import { Button } from '../ui/button'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '../ui/sheet'

export const PublicHeader = async () => {
  const session = await auth()
  const sourceId = await getSourceId()
  const favourites = await redis.get<Favourites>(sourceId ?? '')
  return (
    <header className="flex h-16 items-center justify-between gap-x-6 bg-transparent px-4">
      <div className="flex flex-1 items-center">
        <Link href={routes.home} className="flex items-center gap-2">
          <Image
            width={300}
            height={100}
            alt="logo"
            className="relative"
            src="/logo.svg"
          />
        </Link>
      </div>
      <nav className="hidden md:block">
        {navLinks.map((link) => (
          <Link
            className="group rounded px-3 py-2 font-heading font-semibold text-base text-foreground uppercase transition-all duration-300 ease-in-out hover:text-primary"
            href={link.href}
            key={link.id}
          >
            {link.label}
          </Link>
        ))}
      </nav>
      {session ? (
        <div className="hidden items-center gap-x-6 md:flex">
          <Link href={routes.admin.dashboard} className="text-foreground">
            Backoffice
          </Link>
          <SignOutForm />
        </div>
      ) : (
        <Button
          asChild
          variant="ghost"
          size="icon"
          className="group relative inline-block"
        >
          <Link href={routes.favourites}>
            <div className="diratopm-200 flex h-10 w-10 items-center justify-center rounded-full bg-muted transition-colors ease-in-out group-hover:bg-pink-500">
              <HeartIcon className="h-6 w-6 text-primary group-hover:fill-white group-hover:text-white" />
            </div>
            <div className="-top-1 5 -right-1.5 absolute flex h-5 w-5 items-center justify-center rounded-full bg-pink-500 text-white group-hover:bg-primary">
              <span className="text-xs">
                {favourites ? favourites.ids.length : 0}
              </span>
            </div>
          </Link>
        </Button>
      )}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="link" size="icon" className="border-none md:hidden">
            <MenuIcon className="h-6 w-6 text-primary" />
            <SheetTitle className="sr-only">Toggle nav menu</SheetTitle>
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-full max-w-xs bg-white p-4">
          <nav className="grid gap-2">
            {navLinks.map((link) => (
              <Link
                className="flex items-center gap-2 py-2 font-medium text-gray-600 text-sm hover:text-gray-900"
                href={link.href}
                key={link.id}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  )
}
