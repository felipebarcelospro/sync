import { PlanPrice } from './PlanPrice'

export type Plan = {
  id: string
  paymentProviderId: string
  name: string
  description?: string | null
  metadata?: any
  active: boolean
  prices?: PlanPrice[]
}
