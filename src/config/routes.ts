import type { MultiStepFormType } from '../types'

export const routes = {
  home: '/',
  singleClassified: (slug: string) => `/catalog/${slug}`,
  reserve: (slug: string, step: MultiStepFormType) =>
    `/catalog/${slug}/reserve?step=${step}`,
  success: (slug: string) => `/catalog/${slug}/success`,
  favourites: '/favourites',
  catalog: '/catalog',
  notAvailable: (slug: string) => `/catalog/${slug}/not-available`,
  signIn: '/auth/sign-in',
  challenge: '/auth/challenge',
  admin: {
    dashboard: '/admin/dashboard',
    classifieds: '/admin/classifieds',
    editClassified: (id: number) => `/admin/classifieds/edit/${id}`,
    customers: '/admin/customers',
    editCustomer: (id: number) => `/admin/customers/edit/${id}`,
    settings: '/admin/settings',
  },
  contact: '/contact',
}
