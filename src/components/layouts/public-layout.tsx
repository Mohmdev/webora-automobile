import type { PropsWithChildren } from 'react'
import { PublicFooter } from './footer/footer'
import { Header5 } from './header/header-5'

export function PublicLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Header5 />
      <main>{children}</main>
      <PublicFooter />
    </>
  )
}
