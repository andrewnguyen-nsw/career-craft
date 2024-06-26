import prisma from './prisma'
import { Application, ApplicationCreateInput } from './type'

export const getApplications = async (userId: string) => {
  try {
    const applications = await prisma.application.findMany({
      where: { userId }
    })
    return { applications }
  } catch (error) {
    return { error }
  }
}

export const createApplication = async (
  userId: string,
  applicationData: ApplicationCreateInput
) => {
  try {
    const application = await prisma.application.create({
      data: {
        ...applicationData,
        userId
      }
    })
    return { application }
  } catch (error) {
    return { error }
  }
}

export const updateApplication = async (
  id: string,
  applicationData: Application
) => {
  try {
    const application = await prisma.application.update({
      where: { id },
      data: applicationData
    })
    return { application }
  } catch (error) {
    return { error }
  }
}

export const deleteApplication = async (
  id: string,
) => {
  try {
    await prisma.application.delete({
      where: { id }
    })
    return {}
  } catch (error) {
    return { error }
  }
}
