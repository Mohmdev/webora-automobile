import { navLinks } from '@/config/constants'
import { routes } from '@/config/routes'
import { SiInstagram, SiMeta, SiX } from '@icons-pack/react-simple-icons'
import Image from 'next/image'
import Link from 'next/link'
import { NewsletterForm } from '../shared/newsletter-form'
const socialLinks = [
  {
    id: 1,
    href: 'https://facebook.com',
    icon: (
      <SiMeta className="h-5 w-5 text-gray-600 transition-colors hover:text-primary" />
    ),
  },
  {
    id: 2,
    href: 'https://twitter.com',
    icon: (
      <SiX className="h-5 w-5 text-gray-600 transition-colors hover:text-primary" />
    ),
  },
  {
    id: 3,
    href: 'https://instagram.com',
    icon: (
      <SiInstagram className="h-5 w-5 text-gray-600 transition-colors hover:text-primary" />
    ),
  },
]
export const PublicFooter = () => {
  return (
    <footer className="bg-gray-100 px-8 py-8 lg:px-0">
      <div className="container mx-auto grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="flex flex-col gap-y-2 space-x-2">
          <Link className="flex items-center" href={routes.home}>
            <Image
              width={300}
              height={100}
              alt="logo"
              className="relative h-8"
              src="/logo.svg"
            />
          </Link>
          <div className="flex space-x-4">
            {socialLinks.map((link) => {
              return (
                <Link href={link.href} key={link.id}>
                  {link.icon}
                </Link>
              )
            })}
          </div>
        </div>

        <ul className="space-y-1">
          {navLinks.map((link) => (
            <li key={link.id}>
              <Link
                href={link.href}
                className="text-foreground hover:text-primary"
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href={routes.signIn}
              className="text-foreground hover:text-primary"
            >
              Admin
            </Link>
          </li>
        </ul>

        <NewsletterForm />
      </div>
      <div className="container mx-auto mt-8 text-center text-gray-700">
        <h4 className="font-bold text-lg text-primary">Company Info</h4>
        <p>Company No. 123456789 | VAT No. GB123456789</p>
        <p>
          Majestic Motors is not authorised and not regulated by the Financial
          Conduct Authority
        </p>
      </div>
    </footer>
  )
}
