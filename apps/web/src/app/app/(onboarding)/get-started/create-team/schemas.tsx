import { z } from 'zod'

export const createTenantActionSchema = z.object({
  name: z.string().min(1, 'O nome é necessário'),
})
