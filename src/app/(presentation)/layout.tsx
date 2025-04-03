import { PublicLayout } from '@/components/layouts/public-layout'
import type { PropsWithChildren } from 'react'

export default function PresentationLayout({ children }: PropsWithChildren) {
  return <PublicLayout>{children}</PublicLayout>
}
