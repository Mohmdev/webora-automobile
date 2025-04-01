'use client'
import { updateCustomerAction } from '@/app/_actions/customer'
import { toast } from '@/hooks/use-toast'
import { formatCustomerStatus } from '@/lib/utils'
import {
  EditCustomerSchema,
  type EditCustomerType,
} from '@/schemas/customer.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { type Customer, CustomerStatus } from '@prisma/client'
import { useTransition } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'

export const EditCustomerForm = ({ customer }: { customer: Customer }) => {
  const form = useForm<EditCustomerType>({
    resolver: zodResolver(EditCustomerSchema),
    defaultValues: {
      status: customer.status,
    },
  })

  const [, startTransition] = useTransition()

  const onChangeHandler: SubmitHandler<EditCustomerType> = (data) => {
    startTransition(async () => {
      const result = await updateCustomerAction({
        id: customer.id,
        status: data.status,
      })

      if (result.success) {
        toast({
          title: 'Customer Updated',
          description: result.message,
        })
      } else {
        toast({
          title: 'Error Updating Customer',
          description: result.message,
          variant: 'destructive',
        })
      }
    })
  }

  return (
    <Form {...form}>
      <form onChange={form.handleSubmit(onChangeHandler)}>
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="status">Customer Status</FormLabel>
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
                    {Object.values(CustomerStatus).map((value) => (
                      <SelectItem key={value} value={value}>
                        {formatCustomerStatus(value)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
