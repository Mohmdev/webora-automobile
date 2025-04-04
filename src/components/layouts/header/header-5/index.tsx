import { auth } from '@/auth'
import { Header5Client } from './client'

export async function Header5() {
  const session = await auth()
  return (
    <header>
      <Header5Client session={session} />
    </header>
  )
}
