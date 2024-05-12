'use server'

import { auth } from '@clerk/nextjs/server'
import { createApplication, updateApplication } from '@/lib/applications'
import { Application, ApplicationCreateInput } from '@/lib/type'
import { revalidatePath } from 'next/cache'

export const createApplicationAction = async (data: ApplicationCreateInput) => {
  const { userId } = auth()
  if (!userId) {
    throw new Error('You must be signed in to add an item to your cart')
  }

  await createApplication(userId, data)
  revalidatePath('/applications-tracker')
}

export const updateApplicationAction = async (id: string, data: Application) => {
  await updateApplication(id, data)
  revalidatePath('/applications-tracker')
}