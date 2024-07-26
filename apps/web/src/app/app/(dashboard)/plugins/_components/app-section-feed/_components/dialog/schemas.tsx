import { z } from 'zod'

export const updateIntegrationActionSchema = z.object({
  key: z.string(),
  data: z.record(z.string()),
})
