import { getApplications } from '@/lib/applications'
import { DataTable } from './data-table'
import { columns } from './columns'
import { currentUser, auth } from '@clerk/nextjs/server'

export default async function ApplicationTracker() {
  const { userId } = auth()
  if (!userId) {
    throw new Error('Please log in to view this page.')
  }

  const { applications, error } = await getApplications(userId)
  console.log(
    '🚀 ~ ApplicationTracker ~ applications: -------------------',
    applications
  )

  if (error) {
    throw new Error('Failed to fetch applications')
  }

  return (
    <div className='mx-auto'>
      {applications && <DataTable columns={columns} data={applications} />}
    </div>
  )
}

// TODO: Check if the Clerk User already exist in the table
