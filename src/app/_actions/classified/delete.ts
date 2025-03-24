'use server'

import { routes } from '@/config/routes'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export const deleteClassifiedAction = async (id: number) => {
  try {
    await prisma.classified.delete({ where: { id } })
    revalidatePath(routes.admin.classifieds)
    return { success: true, message: 'Classified deleted' }
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, message: error.message }
    }
    return { success: false, message: 'Something went wrong' }
  }
}
