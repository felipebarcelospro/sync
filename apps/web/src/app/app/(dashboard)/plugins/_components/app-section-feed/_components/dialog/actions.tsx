'use server'

import { client } from '@/services/actions/tenant-client'
import { updateIntegrationActionSchema } from './schemas'
import { modules } from '@app/modules/src'

export const updateIntegrationAction = client.action({
  name: 'tenant.integration.update',
  type: 'mutate',
  schema: updateIntegrationActionSchema,
  handler: async ({ input, context }) => {
    const { tenant, user } = context
    const { key, data } = input

    await modules.usecases.tenant.updateTenant.execute(user.id, tenant.id, {
      settings: {
        integrations: {
          [key]: data,
        },
      },
    })

    return true
  },
})
