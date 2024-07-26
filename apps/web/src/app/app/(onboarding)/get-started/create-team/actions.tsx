'use server'

import { client } from '@/services/actions/user-client'
import { cookies } from 'next/headers'
import { createTenantActionSchema } from './schemas'
import { modules } from '@app/modules/src'

export const createTenantAction = client.action({
  name: 'tenant.create',
  type: 'mutate',
  schema: createTenantActionSchema,
  handler: async ({ input, context }) => {
    const tenant = await modules.usecases.tenant.createTenant.execute(
      context.user.id,
      {
        name: input.name,
        settings: {
          billing: {
            email: context.user.email,
          },
        },
      },
    )

    cookies().set('x-tenant', tenant.id)
    return tenant
  },
})
