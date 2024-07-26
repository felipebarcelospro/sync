import Stripe from 'stripe'

import { toDateTime } from '@/helpers/to-date-time'
import { modules } from '@app/modules/src'

export async function handleInvoicePaymentSucceded(data: Stripe.Invoice) {
  await modules.usecases.subscription.updateSubscription.execute({
    paymentProviderId: data.subscription as string,
    currentPeriodStart: toDateTime(data.period_start),
    currentPeriodEnd: toDateTime(data.period_end),
  })
}
