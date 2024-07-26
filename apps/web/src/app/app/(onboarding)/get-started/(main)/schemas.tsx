import { z } from 'zod'

export const updateUserBaseInfoSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string(),
})
