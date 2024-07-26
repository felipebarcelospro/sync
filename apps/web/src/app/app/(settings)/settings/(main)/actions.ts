'use server'

import { updateProfileActionSchema } from './schemas'
import { cookies } from 'next/headers'
import { modules } from '@app/modules/src'
import { client } from '@/services/actions/tenant-client'

export const updateUserProfileAction = client.action({
  name: 'user.update',
  type: 'mutate',
  schema: updateProfileActionSchema,
  handler: async ({ input, context }) => {
    const { user } = context

    if (input.locale) cookies().set('x-locale', input.locale)

    await modules.usecases.user.updateUser.execute(user.id, {
      name: input.name,
      image: input.image,
    })
  },
})
