'use client'

import { cn } from '@/lib/utils'
import { useSearchParams } from 'next/navigation'

export const FormHeader = () => {
  const params = useSearchParams()
  const steps = [
    { id: '1', title: 'Welcome' },
    { id: '2', title: 'Select Handover Date' },
    { id: '3', title: 'Submit Details' },
  ]

  return (
    <div className="flex justify-between bg-primary p-4 shadow-lg">
      <div className="flex flex-1 flex-col justify-between">
        <h1 className="font-bold text-3xl text-white">
          {steps.find(({ id }) => params.get('step') === id)?.title}
        </h1>
      </div>
      <div className="flex flex-1 items-center justify-end gap-2 font-medium text-muted-foreground text-sm">
        {steps.map((step) => (
          <div
            className={cn(
              'flex h-8 w-8 items-center justify-center rounded-full',
              params.get('step') === step.id
                ? 'bg-white text-muted-foreground'
                : 'bg-primary text-primary-foreground'
            )}
            key={step.id}
          >
            {step.id}
          </div>
        ))}
      </div>
    </div>
  )
}
