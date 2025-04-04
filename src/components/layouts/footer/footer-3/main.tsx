import Link from 'next/link'
import type { NavLink } from '.'
import { NewsletterForm } from './newsteller-form'

export function MainSection({ links }: { links: NavLink[] }) {
  return (
    <div className="grid gap-12 md:grid-cols-5 md:gap-0 lg:grid-cols-4">
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 md:col-span-5 md:row-start-1 lg:col-span-3">
        {links.map((link, index) => (
          <div key={index} className="space-y-4 text-sm">
            <span className="block font-medium">{link.group}</span>
            {link.items.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="block text-muted-foreground duration-150 hover:text-primary"
              >
                <span>{item.title}</span>
              </Link>
            ))}
          </div>
        ))}
      </div>
      <NewsletterForm />
    </div>
  )
}

// const NewsletterFormDemo = () => {
//   return (
//     <form className="row-start-1 border-b pb-8 text-sm md:col-span-2 md:border-none lg:col-span-1">
//       <div className="space-y-4">
//         <Label htmlFor="mail" className="block font-medium">
//           Newsletter
//         </Label>
//         <div className="flex gap-2">
//           <Input
//             type="email"
//             id="mail"
//             name="mail"
//             placeholder="Your email"
//             className="h-8 text-sm"
//           />
//           <Button size="sm">Submit</Button>
//         </div>
//         <span className="block text-muted-foreground text-sm">
//           Don't miss any update!
//         </span>
//       </div>
//     </form>
//   )
// }
