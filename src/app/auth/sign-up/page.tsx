import { RegisterForm } from '@/components/auth/register-form'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sign Up - Webora Motors',
  description: 'Create a new customer account',
}

export default function SignUpPage() {
  return <RegisterForm />
}
