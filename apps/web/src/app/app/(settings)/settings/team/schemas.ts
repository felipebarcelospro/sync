import { z } from 'zod'

export const updateTenantActionSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  logo: z.string().optional().nullish(),
})
