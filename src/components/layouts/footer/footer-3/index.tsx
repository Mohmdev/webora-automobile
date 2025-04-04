import { Copyright } from './copyright'
import { MainSection } from './main'
import { SocialSection } from './social'

export interface NavLink {
  group: string
  items: {
    title: string
    href: string
  }[]
}

export function Footer3() {
  return (
    <footer className="border-b bg-white pt-20 dark:bg-transparent">
      <SocialSection />
      <div className="mx-auto max-w-5xl px-6">
        <MainSection links={links} />
        <Copyright />
      </div>
    </footer>
  )
}

const links: NavLink[] = [
  {
    group: 'Product',
    items: [
      {
        title: 'Features',
        href: '#',
      },
      {
        title: 'Solution',
        href: '#',
      },
      {
        title: 'Customers',
        href: '#',
      },
      {
        title: 'Pricing',
        href: '#',
      },
      {
        title: 'Help',
        href: '#',
      },
      {
        title: 'About',
        href: '#',
      },
    ],
  },
  {
    group: 'Solution',
    items: [
      {
        title: 'Startup',
        href: '#',
      },
      {
        title: 'Freelancers',
        href: '#',
      },
      {
        title: 'Organizations',
        href: '#',
      },
      {
        title: 'Students',
        href: '#',
      },
      {
        title: 'Collaboration',
        href: '#',
      },
      {
        title: 'Design',
        href: '#',
      },
      {
        title: 'Management',
        href: '#',
      },
    ],
  },
  {
    group: 'Company',
    items: [
      {
        title: 'About',
        href: '#',
      },
      {
        title: 'Careers',
        href: '#',
      },
      {
        title: 'Blog',
        href: '#',
      },
      {
        title: 'Press',
        href: '#',
      },
      {
        title: 'Contact',
        href: '#',
      },
      {
        title: 'Help',
        href: '#',
      },
    ],
  },
  {
    group: 'Legal',
    items: [
      {
        title: 'Licence',
        href: '#',
      },
      {
        title: 'Privacy',
        href: '#',
      },
      {
        title: 'Cookies',
        href: '#',
      },
      {
        title: 'Security',
        href: '#',
      },
    ],
  },
]
