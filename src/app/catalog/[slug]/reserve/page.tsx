import { fetchClassifiedBySlug } from '@/_data'
import { SelectDate } from '@/components/reserve/select-date'
import { SubmitDetails } from '@/components/reserve/submit-details'
import { Welcome } from '@/components/reserve/welcome'
import { MultiStepFormSchema } from '@/schemas/form.schema'
import { MultiStepFormEnum, type ParamsPromisedProps } from '@/types'
import { notFound } from 'next/navigation'

const MAP_STEP_TO_COMPONENT = {
  [MultiStepFormEnum.WELCOME]: Welcome,
  [MultiStepFormEnum.SELECT_DATE]: SelectDate,
  [MultiStepFormEnum.SUBMIT_DETAILS]: SubmitDetails,
}

export default async function ReservePage(props: ParamsPromisedProps) {
  const searchParams = await props.searchParams
  const params = await props.params
  const slug = params?.slug
  const step = searchParams?.step

  const { data, success, error } = MultiStepFormSchema.safeParse({
    slug,
    step: Number(step),
  })

  if (!success) {
    console.log({ error })
    notFound()
  }

  const classified = await fetchClassifiedBySlug(data.slug)

  if (!classified) {
    notFound()
  }

  const Component = MAP_STEP_TO_COMPONENT[data.step]

  return (
    <Component
      searchParams={searchParams}
      params={params}
      classified={classified}
    />
  )
}
