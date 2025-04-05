import type { MultiStepFormType } from '../types'

export const routes = {
  home: '/',
  singleClassified: (slug: string) => `/inventory/${slug}`,
  reserve: (slug: string, step: MultiStepFormType) =>
    `/inventory/${slug}/reserve?step=${step}`,
  success: (slug: string) => `/inventory/${slug}/success`,
  favourites: '/favourites',
  inventory: '/inventory',
  notAvailable: (slug: string) => `/inventory/${slug}/not-available`,
  signIn: '/auth/sign-in',
  signUp: '/auth/sign-up',
  challenge: '/auth/challenge',
  admin: {
    dashboard: '/admin/dashboard',
    classifieds: '/admin/classifieds',
    editClassified: (id: number) => `/admin/classifieds/edit/${id}`,
    customers: '/admin/customers',
    editCustomer: (id: number) => `/admin/customers/edit/${id}`,
    settings: '/admin/settings',
    userManagement: '/admin/user-management',
  },
  contact: '/contact',
  about: '/about',
  help: '/help',
}
