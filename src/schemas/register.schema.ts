import { z } from 'zod'

export const RegisterSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(100, 'Password must be less than 100 characters'),
  confirmPassword: z.string(),
  mobile: z.string().optional(),
  terms: z.enum(['true', 'false'], {
    message: 'You must agree to the terms and conditions',
  }),
})
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })
  .refine((data) => data.terms === 'true', {
    message: 'You must accept the terms and conditions',
    path: ['terms'],
  })

export type RegisterSchemaType = z.infer<typeof RegisterSchema>
