import { authOptions } from '@/services/auth/config'
import { User, getServerSession } from 'next-auth'

export const createContext = async () => {
  const session = await getServerSession(authOptions)
  return {
    user: session.user as User | null,
  }
}
