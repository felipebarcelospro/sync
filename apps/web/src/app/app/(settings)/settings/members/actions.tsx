'use server'

import { client } from '@/services/actions/tenant-client'
import { z } from 'zod'
import { inviteMemberActionSchema } from './schemas'
import { modules } from '@app/modules/src'
import { APP_CONFIGS } from '@/boilerplate.config'
import { renderAsync } from '@react-email/components'
import InviteEmail from '@/emails/invite'
import { getUrl } from '@/helpers/get-url'

export const getTenantAdminMembersActions = client.action({
  name: 'app.tenant.members.admin.get',
  type: 'query',
  handler: async ({ context }) => {
    const { tenant, user } = context

    return modules.usecases.membership.listMembershipsOnTenant.execute({
      userId: user.id,
      tenantId: tenant.id,
    })
  },
})

export const deleteMemberOnTeamAction = client.action({
  name: 'app.tenant.members.admin.delete',
  type: 'mutate',
  schema: z.object({
    id: z.string(),
  }),
  handler: async ({ input, context }) => {
    const { tenant, user } = context
    const { id } = input

    await modules.usecases.membership.deleteMembershipOnTenant.execute({
      currentTenantId: tenant.id,
      currentUserId: user.id,
      membershipToDeleteId: id,
    })
  },
})

export const getTenantAdminMembersInvitesActions = client.action({
  name: 'app.tenant.members.invites.admin.get',
  type: 'query',
  handler: async ({ context }) => {
    const { tenant, user } = context

    return modules.usecases.invite.listInvites.execute({
      userId: user.id,
      tenantId: tenant.id,
    })
  },
})

export const deleteInviteAction = client.action({
  name: 'app.tenant.members.invites.admin.delete',
  type: 'mutate',
  schema: z.object({
    inviteId: z.string(),
  }),
  handler: async ({ input, context }) => {
    const { tenant, user } = context
    const { inviteId } = input

    await modules.usecases.invite.deleteInvite.execute({
      userId: user.id,
      tenantId: tenant.id,
      inviteId,
    })
  },
})

export const inviteMemberAction = client.action({
  name: 'app.tenant.member.invite',
  type: 'mutate',
  schema: inviteMemberActionSchema,
  handler: async ({ input, context }) => {
    const { tenant } = context

    const invite = await modules.usecases.invite.createInvite.execute(
      tenant.id,
      {
        email: input.email,
        role: 'member',
      },
    )

    await modules.provider.mail.send({
      from: APP_CONFIGS.providers.mail.resend.from,
      to: input.email,
      subject: `Welcome to ${APP_CONFIGS.app.name}`,
      body: await renderAsync(
        InviteEmail({
          email: input.email,
          team: tenant.name,
          url: getUrl(`/app/invites/${invite.id}`),
        }),
      ),
    })

    return {
      success: true,
      email: invite.email,
    }
  },
})
