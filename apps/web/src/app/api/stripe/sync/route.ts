import { createApiHandler } from '@/services/http/lib'
import { modules } from '@app/modules/src'
import { NextResponse } from 'next/server'
import { defaultProducts } from './_data/default-products'

export const GET = createApiHandler({
  handler: async () => {
    console.log('Fetching products from Stripe')
    let products = await modules.provider.payment.stripe.products.list({
      active: true,
    })

    if (products.data.length === 0) {
      console.log('No active products found, creating default products...')

      // Create products on Stripe and in the DB
      for (const productData of defaultProducts) {
        await modules.provider.payment.createPlan(productData)
        console.log(`Stripe product created: ${productData.name}`)
      }

      products = await modules.provider.payment.stripe.products.list({
        active: true,
      })
    }

    for (const product of products.data) {
      console.log('Updating Product: ', product.id)
      await modules.usecases.plan.upsertPlan.execute({
        paymentProviderId: product.id,
        active: product.active as boolean,
        name: product.name,
        description: product.description,
        metadata: product.metadata,
      })
    }

    console.log('Products updated successfully!')
    console.log('Fetching prices from Stripe')

    const prices = await modules.provider.payment.stripe.prices.list()
    console.log('Updating Prices')

    for (const price of prices.data) {
      console.log(price)
      const plan = await modules.usecases.plan.getPlanByProviderId.execute(
        price.product as string,
      )

      console.log(plan)

      await modules.usecases.planPrice.upsertPlanPrice.execute({
        paymentProviderId: price.id,
        active: price.active,
        type: price.type,
        price: price.unit_amount,
        currency: price.currency,
        interval: price.recurring.interval,
        intervalCount: price.recurring.interval_count,
        trialPeriodDays: price.recurring.trial_period_days,
        planId: plan.id,
      })
    }

    console.log('Prices updated successfully!')
    return NextResponse.json({ status: 'SYNC' })
  },
})
