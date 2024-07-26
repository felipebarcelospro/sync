'use server'

import { client } from '@/services/actions/user-client'
import { updateUserBaseInfoSchema } from './schemas'
import { getUTMSFromSSR } from '@/helpers/get-ssr.utms'
import { modules } from '@app/modules/src'
import { cookies } from 'next/headers'

export const updateUserBaseInfo = client.action({
  name: 'user.onboarding.start',
  type: 'mutate',
  schema: updateUserBaseInfoSchema,
  handler: async ({ input, context }) => {
    const { user } = context

    await modules.usecases.user.updateUser.execute(user.id, {
      name: input.name,
      settings: {
        contact: {
          phone: input.phone,
        },
        utms: getUTMSFromSSR(),
      },
    })

    const inviteId = cookies().get('x-tenant-invite')
    if (inviteId) {
      const invite = await modules.usecases.invite.acceptInvite.execute({
        userId: user.id,
        inviteId: inviteId.value,
      })

      return {
        redirect: `/app/select-account/${invite.tenantId}`,
      }
    }

    return {
      redirect: '/app/get-started/create-team',
    }
  },
})
