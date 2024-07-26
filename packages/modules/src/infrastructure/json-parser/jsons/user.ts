import { z } from 'zod'

export const userSettingsSchema = z.object({
  contact: z.object({
    phone: z.string().optional(),
  }),
  utms: z.object({
    utm_source: z.string().optional(),
    utm_medium: z.string().optional(),
    utm_campaign: z.string().optional(),
    utm_term: z.string().optional(),
    utm_content: z.string().optional(),
  }),
})

export const userSettingsDefault: z.infer<typeof userSettingsSchema> = {
  contact: {
    phone: '',
  },
  utms: {
    utm_campaign: '',
    utm_content: '',
    utm_medium: '',
    utm_source: '',
    utm_term: '',
  },
}
