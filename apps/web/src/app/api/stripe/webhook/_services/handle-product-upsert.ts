import Stripe from 'stripe'

import { modules } from '@app/modules/src'

export async function handleProductUpsert(data: Stripe.Product) {
  await modules.usecases.plan.upsertPlan.execute({
    paymentProviderId: data.id,
    active: data.active as boolean,
    name: data.name,
    description: data.description,
    metadata: data.metadata,
  })
}
