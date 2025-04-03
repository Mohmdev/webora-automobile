import type { PropsWithChildren } from 'react'
import { PublicFooter } from './footer/footer'
import { PublicHeader } from './header/header-1'

export function PublicLayout({ children }: PropsWithChildren) {
  return (
    <>
      <PublicHeader />
      <main>{children}</main>
      <PublicFooter />
    </>
  )
}
