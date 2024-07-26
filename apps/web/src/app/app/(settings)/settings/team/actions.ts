'use server'

import { client } from '@/services/actions/tenant-client'
import { updateTenantActionSchema } from './schemas'
import { modules } from '@app/modules/src'

export const updateTenantAction = client.action({
  name: 'tenant.update',
  type: 'mutate',
  schema: updateTenantActionSchema,
  handler: async ({ input, context }) => {
    const { user, tenant } = context

    return modules.usecases.tenant.updateTenant.execute(user.id, tenant.id, {
      name: input.name,
      logo: input.logo,
    })
  },
})
