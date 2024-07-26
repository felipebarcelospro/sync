import { z } from 'zod'

export const updateProfileActionSchema = z.object({
  image: z.string().optional().nullish(),
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  username: z.string().nullable().optional(),
  email: z.string().nullable().optional(),
  locale: z.string().default('en').optional(),
})
