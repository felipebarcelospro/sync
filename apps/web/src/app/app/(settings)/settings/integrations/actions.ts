'use server'

import { client } from '@/services/actions/tenant-client'
import { modules } from '@app/modules/src'

export const regenerateTokenAction = client.action({
  name: 'tenant.token.regenerate',
  type: 'mutate',
  handler: async ({ context }) => {
    const { user, tenant } = context
    return modules.usecases.tenant.regenerateExternalApiToken.execute(
      user.id,
      tenant.id,
    )
  },
})
