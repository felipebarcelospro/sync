import { FeatureInfo } from './feature-info'
import { PlanFeature } from './plan-feature'
import { SubscriptionHistory } from './subscription-history'

export type SubscriptionInfo = {
  currentPlan: {
    id: string
    subscriptionPaymentProviderId: string
    planPaymentProviderId: string
    pricePaymentProviderId: string
    name: string
    metadata: Record<string, unknown>
    features: PlanFeature[]
    status: string
    startDate: Date
    endDate: Date | null
    price: number
    paymentInterval: string
  }

  features: FeatureInfo[]

  trialInfo: {
    isInTrial: boolean
    trialStartDate: Date | null
    trialEndDate: Date | null
  }

  billingDetails: {
    nextPaymentDue: Date | null
    lastPaymentDate: Date | null
  }

  history?: SubscriptionHistory[]
}
