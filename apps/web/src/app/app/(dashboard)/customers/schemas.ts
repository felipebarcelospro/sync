import { z } from 'zod'

export const upsertCollaboratorSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'Nome obrigatório'),
  email: z.string().email('Email inválido'),
  status: z.enum(['active', 'inactive']).optional(),

  departmentId: z.string().optional(),
})
