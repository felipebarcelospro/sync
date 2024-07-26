import Stripe from 'stripe'

import { modules } from '@app/modules/src'

export async function handleCheckoutSessionCompleted(
  session: Stripe.Checkout.Session,
) {
  const stripeSubscription = await modules.provider.payment.getSubscription(
    session.subscription as string,
  )

  const subscription =
    await modules.usecases.subscription.getSubscriptionByProviderId.execute(
      session.subscription as string,
    )

  if (!subscription) {
    await modules.usecases.subscription.createSubscription.execute({
      tenantId: session.client_reference_id,
      ...stripeSubscription,
    })

    return
  }

  await modules.usecases.subscription.updateSubscription.execute(
    stripeSubscription,
  )
}
