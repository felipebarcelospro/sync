import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/config'
import { headers } from 'next/headers'
import { User } from '@app/modules/src/domain/entities/User'
import { redirect } from 'next/navigation'

export const getCurrentUser = async () => {
  const session = await getServerSession(authOptions)

  if (!session) {
    const pathname = headers().get('x-pathname')
    if (pathname !== '/auth') return redirect('/auth/session-expired')
  }

  return session.user as User
}
