import { fetchClassifiedById } from '@/_data'
import { ClassifiedForm } from '@/components/classified/classified-form'
import { routes } from '@/config/routes'
import { validateIdSchema } from '@/schemas/id.schema'
import type { PromisedParams } from '@/types'
import { redirect } from 'next/navigation'

export default async function EditClassified(props: PromisedParams) {
  const params = await props.params

  const { data, success } = validateIdSchema.safeParse({
    id: Number(params?.id),
  })

  if (!success) {
    redirect(routes.admin.classifieds)
  }

  const classified = await fetchClassifiedById(data.id)

  if (!classified) {
    redirect(routes.admin.classifieds)
  }

  return <ClassifiedForm classified={classified} />
}
