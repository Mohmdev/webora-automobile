import type { PropsWithChildren } from 'react'
import { Footer3 } from './footer/footer-3'
import { Header5 } from './header/header-5'

export function PublicLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Header5 />
      <main>{children}</main>

      <Footer3 />
      {/* <Footer4 /> */}
      {/* <PublicFooter /> */}
    </>
  )
}
