import { routes } from '@/config/routes'
import Link from 'next/link'

const links = [
  {
    title: 'Home',
    href: routes.home,
  },
  {
    title: 'Inventory',
    href: routes.inventory,
  },
  {
    title: 'Contact',
    href: routes.contact,
  },
  {
    title: 'About',
    href: routes.about,
  },
  {
    title: 'Help',
    href: routes.help,
  },
]

export function Footer4() {
  return (
    <footer className="border-b bg-white py-12 dark:bg-transparent">
      <div className="mx-auto max-w-5xl px-6">
        <div className="flex flex-wrap justify-between gap-6">
          <span className="order-last block text-center text-muted-foreground text-sm md:order-first">
            © {new Date().getFullYear()} Webora Motors, All rights reserved
          </span>
          <div className="order-first flex flex-wrap justify-center gap-6 text-sm md:order-last">
            {links.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="block text-muted-foreground duration-150 hover:text-primary"
              >
                <span>{link.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
