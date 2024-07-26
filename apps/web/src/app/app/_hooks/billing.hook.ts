import { useAction } from '@/services/actions/lib/client'
import {
  createCheckoutSessionAction,
  createManagerSessionAction,
} from '../(settings)/settings/billing/actions'
import { useApplication } from './application.hook'
import { useState } from 'react'

export function useBilling() {
  const application = useApplication()

  const createCheckoutSession = useAction(createCheckoutSessionAction)
  const createAccountSession = useAction(createManagerSessionAction)

  const [period, setPeriod] = useState<'month' | 'year'>('month')

  async function createCheckoutForPlan(priceId: string) {
    const url = await createCheckoutSession.execute({ priceId })
    window.open(url)
  }

  async function createAccountManagerForTenant() {
    const url = await createAccountSession.execute({})
    window.open(url)
  }

  return {
    plans: application.plans,
    period,
    setPeriod,
    createCheckoutForPlan,
    createAccountManagerForTenant,
    isSubmittingManager: createAccountSession.isSubmitting,
    isSubmittingCheckout: createCheckoutSession.isSubmitting,
    subscription: application.session.tenant.subscription,
  }
}
