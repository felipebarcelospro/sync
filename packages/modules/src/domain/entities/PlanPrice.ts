export type PlanPrice = {
  id: string
  planId: string
  paymentProviderId: string
  active: boolean
  type: string // e.g., "recurring"
  price: number // Assuming price is stored as an integer (e.g., cents)
  currency: string
  interval: string // e.g., "month", "year"
  intervalCount: number
  trialPeriodDays?: number | null
}
