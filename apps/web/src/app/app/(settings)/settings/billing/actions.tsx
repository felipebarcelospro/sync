'use server'

import { getUrl } from '@/helpers/get-url'
import { client } from '@/services/actions/tenant-client'
import { createCheckoutSessionSchema } from './schemas'
import { modules } from '@app/modules/src'
import { interpolate } from '@/helpers/interpolate'
import { APP_CONFIGS } from '@/boilerplate.config'

export const createCheckoutSessionAction = client.action({
  name: 'app.checkout.session',
  type: 'mutate',
  schema: createCheckoutSessionSchema,
  handler: async ({ input, context }) => {
    const { tenant } = context
    const { priceId } = input

    return modules.provider.payment.createCheckoutSession({
      customerId: tenant.paymentProviderId,
      subscriptionId:
        tenant.subscription.currentPlan.subscriptionPaymentProviderId,
      priceId,
      successUrl: getUrl('/app/settings/billing?success=true'),
      cancelUrl: getUrl('/app/settings/billing?success=false'),
    })
  },
})

export const createManagerSessionAction = client.action({
  name: 'app.account-manager.session',
  type: 'mutate',
  handler: async ({ context }) => {
    const { tenant } = context

    return modules.provider.payment.createCustomerPortalSession({
      customerId: tenant.paymentProviderId,
      returnUrl: getUrl('/app/settings/billing?success=true'),
    })
  },
})

export const getPlansAction = client.action({
  name: 'app.plans.get',
  type: 'query',
  handler: async () => {
    const plans = await modules.usecases.plan.getPlans.execute()

    const plansWithFeatured = plans.map((plan) => ({
      ...plan,
      features: Object.keys(plan.metadata).map((key) => {
        return {
          id: key,
          value: plan.metadata[key],
          label: interpolate(APP_CONFIGS.providers.billing.meta[key].label, {
            value: plan.metadata[key],
          }),
        }
      }),
    }))

    const plansOrderedByPrice = plansWithFeatured.sort(
      (a, b) => a.prices[0].price - b.prices[0].price,
    )

    return plansOrderedByPrice
  },
})
