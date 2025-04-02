'use client'

import { updateClassified } from '@/_data/classified/mutations'
import { ClassifiedFormFields } from '@/components/classified/classified-form/form-fields'
import { MultiImageUploader } from '@/components/classified/multi-image-uploader'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { MAX_IMAGES } from '@/config/constants'
import { routes } from '@/config/routes'
import { useToast } from '@/hooks/use-toast'
import { formatClassifiedStatus } from '@/lib/utils'
import {
  type UpdateClassifiedType,
  updateClassifiedSchema,
} from '@/schemas/classified.schema'
import type { ClassifiedData, ClassifiedImages } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { ClassifiedStatus, CurrencyCode, OdoUnit } from '@prisma/client'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'

interface ClassifiedFormProps {
  classified: ClassifiedImages & ClassifiedData
}

const UPLOADS_REGEX = /uploads\/.+/

function extractKey(url: string) {
  const nextUrl = new URL(url)
  nextUrl.href = url

  const match = url.match(UPLOADS_REGEX)

  return match ? match[0] : url
}

export const ClassifiedForm = ({ classified }: ClassifiedFormProps) => {
  const [isPending, startTransition] = useTransition()
  const { toast } = useToast()
  const router = useRouter()

  const form = useForm<UpdateClassifiedType>({
    resolver: zodResolver(updateClassifiedSchema),
    defaultValues: {
      id: classified.id,
      odoUnit: OdoUnit.MILES,
      currency: CurrencyCode.GBP,
      ...(classified && {
        images: classified.images
          ? classified.images.map((image, index) => ({
              ...image,
              id: index + 1,
              percentage: 100,
              key: extractKey(image.src),
              done: true,
            }))
          : [],
        make: classified.makeId.toString(),
        model: classified.modelId.toString(),
        modelVariant: classified.modelVariantId?.toString(),
        year: classified.year.toString(),
        vrm: classified.vrm ?? '',
        description: classified.description ?? '',
        fuelType: classified.fuelType,
        bodyType: classified.bodyType,
        transmission: classified.transmission,
        colour: classified.colour,
        ulezCompliance: classified.ulezCompliance,
        status: classified.status,
        odoReading: classified.odoReading,
        seats: classified.seats,
        doors: classified.doors,
        price: classified.price / 100,
      }),
    },
  })

  const classifiedFormSubmit: SubmitHandler<UpdateClassifiedType> = (data) => {
    startTransition(async () => {
      const {
        success,
        message,
        data: _responseData,
      } = await updateClassified(data)
      if (success) {
        toast({
          title: 'Success',
          description: 'Classified updated successfully',
          type: 'background',
          duration: 2500,
        })
        router.push(routes.admin.classifieds)
      } else {
        toast({
          title: 'Error',
          description: message,
          type: 'background',
          duration: 2500,
          variant: 'destructive',
        })
      }
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(classifiedFormSubmit)}>
        <h1 className="mb-6 font-bold text-3xl text-muted">Upload Vehicle</h1>
        <div className="mx-auto grid w-full grid-cols-1 gap-6 lg:grid-cols-2">
          <ClassifiedFormFields />
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="images"
              render={({ field: { name, onChange } }) => (
                <FormItem>
                  <FormLabel className="text-muted" htmlFor="images">
                    Images (up to {MAX_IMAGES})
                  </FormLabel>
                  <FormControl>
                    <MultiImageUploader name={name} onChange={onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-muted" htmlFor="status">
                    Status
                  </FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <SelectTrigger className="border-transparent bg-primary-800 text-muted/75">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.values(ClassifiedStatus).map((value) => (
                          <SelectItem key={value} value={value}>
                            {formatClassifiedStatus(value)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              disabled={isPending}
              type="submit"
              className="flex w-full gap-x-2"
            >
              {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
              Submit
            </Button>
          </div>
        </div>
      </form>
    </Form>
  )
}
