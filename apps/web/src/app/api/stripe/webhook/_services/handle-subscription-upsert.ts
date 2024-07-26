import Stripe from 'stripe'

import { toDateTime } from '@/helpers/to-date-time'
import { modules } from '@app/modules/src'

export async function handleSubscriptionUpsert(data: Stripe.Subscription) {
  await modules.usecases.subscription.updateSubscription.execute({
    paymentProviderId: data.id,

    status: data.status,

    cancelAtPeriodEnd: data.cancel_at_period_end,
    cancelAt: toDateTime(data.cancel_at),
    canceledAt: toDateTime(data.canceled_at),

    currentPeriodStart: toDateTime(data.current_period_start),
    currentPeriodEnd: toDateTime(data.current_period_end),

    endedAt: toDateTime(data.ended_at),

    trialStart: toDateTime(data.trial_start),
    trialEnd: toDateTime(data.trial_end),
    createdAt: toDateTime(data.created),

    priceId: data.items.data[0].price.id,
  })
}
