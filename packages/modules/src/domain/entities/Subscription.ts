export type Subscription = {
  id: string
  tenantId: string
  paymentProviderId: string
  status: string
  cancelAtPeriodEnd: boolean
  cancelAt?: Date | null
  canceledAt?: Date | null
  currentPeriodStart?: Date | null
  currentPeriodEnd?: Date | null
  endedAt?: Date | null
  trialStart?: Date | null
  trialEnd?: Date | null
  priceId: string
  createdAt: Date
}
