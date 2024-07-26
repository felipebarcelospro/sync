'use server'

import { client } from '@/services/actions/public-client'
import { modules } from '@app/modules/src'
import { z } from 'zod'

export const getInviteAction = client.action({
  name: 'app.invites.get',
  type: 'mutate',
  schema: z.object({
    id: z.string(),
  }),
  async handler({ input, context }) {
    const { user } = context
    const { id } = input

    const invite = await modules.usecases.invite.getInviteById.execute(id)
    if (invite.email !== user.email || invite.expiresAt <= new Date()) {
      return {
        invite: null,
      }
    }

    return {
      invite,
    }
  },
})

export const acceptInviteAction = client.action({
  name: 'app.invites.accept',
  type: 'mutate',
  schema: z.object({
    id: z.string(),
  }),
  async handler({ input, context }) {
    const { user } = context
    const { id } = input

    const invite = await modules.usecases.invite.getInviteById.execute(id)
    if (invite.email !== user.email || invite.expiresAt <= new Date()) {
      throw new Error('Invite is invalid')
    }

    await modules.usecases.invite.acceptInvite.execute({
      inviteId: id,
      userId: user.id,
    })

    return {
      redirect: `/app/select-account/${invite.tenantId}`,
    }
  },
})
