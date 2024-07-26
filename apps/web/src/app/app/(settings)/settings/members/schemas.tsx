import { z } from 'zod'

export const inviteMemberActionSchema = z.object({
  email: z.string().email('O e-mail deve ser válido.'),
})
