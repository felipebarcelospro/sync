'use server'

import { client } from '@/services/actions/tenant-client'
import { upsertCollaboratorSchema } from './schemas'
import { z } from 'zod'
import { modules } from '@app/modules/src'

export const listCustomersAction = client.action({
  name: 'tenant.customers.list',
  type: 'query',
  handler: async ({ context }) => {
    return modules.usecases.membership.listMembershipsOnTenant.execute({
      tenantId: context.tenant.id,
      userId: context.user.id,
      role: 'CUSTOMER',
    })
  },
})

export const upsertCustomerAction = client.action({
  name: 'tenant.customers.upsert',
  type: 'mutate',
  schema: upsertCollaboratorSchema,
  handler: async () => {
    return {
      id: '1',
      name: 'Teste',
      email: 'teste@teste.com',
    }
  },
})

export const deleteCustomerAction = client.action({
  name: 'tenant.customers.delete',
  type: 'mutate',
  schema: z.object({
    customerId: z.string(),
  }),
  handler: async ({ input, context }) => {
    return modules.usecases.membership.deleteMembershipOnTenant.execute({
      currentTenantId: context.tenant.id,
      currentUserId: context.user.id,
      membershipToDeleteId: input.customerId,
    })
  },
})

export const getCustomerByIdAction = client.action({
  name: 'tenant.customers.getById',
  type: 'query',
  schema: z.object({
    customerId: z.string(),
  }),
  handler: async ({ input, context }) => {
    return modules.usecases.membership.getMembershipOnTenant.execute(
      input.customerId,
      context.tenant.id,
    )
  },
})
