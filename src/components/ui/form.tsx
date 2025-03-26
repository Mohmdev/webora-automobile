import type * as LabelPrimitive from '@radix-ui/react-label'
import { Slot } from '@radix-ui/react-slot'
import * as React from 'react'
import {
  Controller,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
  FormProvider,
  useFormContext,
  useFormState,
} from 'react-hook-form'

import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

const Form = FormProvider

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName
}

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
)

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  )
}

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext)
  const itemContext = React.useContext(FormItemContext)
  const { getFieldState } = useFormContext()
  const formState = useFormState({ name: fieldContext.name })
  const fieldState = getFieldState(fieldContext.name, formState)

  if (!fieldContext) {
    throw new Error('useFormField should be used within <FormField>')
  }

  const { id } = itemContext

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  }
}

type FormItemContextValue = {
  id: string
}

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue
)

function FormItem({ className, ...props }: React.ComponentProps<'div'>) {
  const id = React.useId()

  return (
    <FormItemContext.Provider value={{ id }}>
      <div
        data-slot="form-item"
        className={cn('grid gap-2', className)}
        {...props}
      />
    </FormItemContext.Provider>
  )
}

function FormLabel({
  className,
  htmlFor,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  try {
    // Check if we're in a form context
    const formContext = useFormContext()
    if (!formContext) {
      // If not in a form context, render a basic label
      return (
        <Label
          data-slot="form-label"
          className={className}
          htmlFor={htmlFor}
          {...props}
        />
      )
    }

    // If in a form context, use form field
    const { error, formItemId } = useFormField()
    return (
      <Label
        data-slot="form-label"
        data-error={!!error}
        className={cn('data-[error=true]:text-destructive', className)}
        htmlFor={formItemId || htmlFor}
        {...props}
      />
    )
  } catch (_e) {
    // Fallback if context throws an error
    return (
      <Label
        data-slot="form-label"
        className={className}
        htmlFor={htmlFor}
        {...props}
      />
    )
  }
}

function FormControl({ ...props }: React.ComponentProps<typeof Slot>) {
  try {
    // Check if we're in a form context
    const formContext = useFormContext()
    if (!formContext) {
      // If not in a form context, render a basic Slot
      return <Slot data-slot="form-control" {...props} />
    }

    // If in a form context, use form field
    const { error, formItemId, formDescriptionId, formMessageId } =
      useFormField()
    return (
      <Slot
        data-slot="form-control"
        id={formItemId}
        aria-describedby={
          error
            ? `${formDescriptionId} ${formMessageId}`
            : `${formDescriptionId}`
        }
        aria-invalid={!!error}
        {...props}
      />
    )
  } catch (_e) {
    // Fallback if context throws an error
    return <Slot data-slot="form-control" {...props} />
  }
}

function FormDescription({ className, ...props }: React.ComponentProps<'p'>) {
  try {
    // Check if we're in a form context
    const formContext = useFormContext()
    if (!formContext) {
      // If not in a form context, render a basic description
      return (
        <p
          data-slot="form-description"
          className={cn('text-muted-foreground text-sm', className)}
          {...props}
        />
      )
    }

    // If in a form context, use form field
    const { formDescriptionId } = useFormField()
    return (
      <p
        data-slot="form-description"
        id={formDescriptionId}
        className={cn('text-muted-foreground text-sm', className)}
        {...props}
      />
    )
  } catch (_e) {
    // Fallback if context throws an error
    return (
      <p
        data-slot="form-description"
        className={cn('text-muted-foreground text-sm', className)}
        {...props}
      />
    )
  }
}

function FormMessage({ className, ...props }: React.ComponentProps<'p'>) {
  try {
    // Check if we're in a form context
    const formContext = useFormContext()
    if (!formContext) {
      // If not in a form context, just render children
      return props.children ? (
        <p
          data-slot="form-message"
          className={cn('text-destructive text-sm', className)}
          {...props}
        />
      ) : null
    }

    // If in a form context, use form field
    const { error, formMessageId } = useFormField()
    const body = error ? String(error?.message ?? '') : props.children

    if (!body) {
      return null
    }

    return (
      <p
        data-slot="form-message"
        id={formMessageId}
        className={cn('text-destructive text-sm', className)}
        {...props}
      >
        {body}
      </p>
    )
  } catch (_e) {
    // Fallback if context throws an error
    return props.children ? (
      <p
        data-slot="form-message"
        className={cn('text-destructive text-sm', className)}
        {...props}
      />
    ) : null
  }
}

export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
}
