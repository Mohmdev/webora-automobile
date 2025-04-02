import { fetchDetailedClassifiedBySlug } from '@/_data'
import { ClassifiedView } from '@/components/classified/classified-view'
import type { ParamsPromisedProps } from '@/types'
import { notFound } from 'next/navigation'

export default async function ClassifiedPage(props: ParamsPromisedProps) {
  const params = await props?.params

  const slug = decodeURIComponent(params?.slug as string)

  if (!slug) {
    notFound()
  }

  const classified = await fetchDetailedClassifiedBySlug(slug)

  if (!classified) {
    notFound()
  }

  return <ClassifiedView {...classified} />
}
