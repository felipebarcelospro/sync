import { getCurrentTenant } from './get-current-tenant'
import { getCurrentUser } from './get-current-user'

export const getApplicationSession = async () => {
  const user = await getCurrentUser()
  const tenant = await getCurrentTenant(user)

  return {
    user,
    tenant,
  }
}
