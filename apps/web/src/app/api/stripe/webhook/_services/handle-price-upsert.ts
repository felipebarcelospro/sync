import Stripe from 'stripe'

import { modules } from '@app/modules/src'

export async function handlePriceUpsert(data: Stripe.Price) {
  const plan = await modules.usecases.plan.getPlanByProviderId.execute(
    data.product as string,
  )

  await modules.usecases.planPrice.upsertPlanPrice.execute({
    paymentProviderId: data.id,
    active: data.active,
    type: data.type,
    price: data.unit_amount,
    currency: data.currency,
    interval: data.recurring.interval,
    intervalCount: data.recurring.interval_count,
    trialPeriodDays: data.recurring.trial_period_days,
    planId: plan.id,
  })
}
