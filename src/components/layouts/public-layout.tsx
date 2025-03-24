import type { PropsWithChildren } from 'react'
import { PublicFooter } from './footer'
import { PublicHeader } from './header'

export function PublicLayout({ children }: PropsWithChildren) {
  return (
    <>
      <PublicHeader />
      <main>{children}</main>
      <PublicFooter />
    </>
  )
}
