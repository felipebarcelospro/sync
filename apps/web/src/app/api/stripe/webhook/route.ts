import Stripe from 'stripe'

import { APP_CONFIGS } from '@/boilerplate.config'
import { handleInvoicePaymentSucceded } from './_services/handle-invoice-payment-succeded'
import { handleSubscriptionUpsert } from './_services/handle-subscription-upsert'
import { handleProductUpsert } from './_services/handle-product-upsert'
import { handlePriceUpsert } from './_services/handle-price-upsert'
import { handleCheckoutSessionCompleted } from './_services/handle-checkout-session-completed'
import { modules } from '@app/modules/src'

export async function POST(req: Request) {
  const body = await req.text()
  const signature = req.headers.get('Stripe-Signature') as string

  let event: Stripe.Event

  try {
    event = modules.provider.payment.stripe.webhooks.constructEvent(
      body,
      signature,
      APP_CONFIGS.providers.billing.keys.webhook as string,
    )
  } catch (error: any) {
    console.error(`Webhook Error: ${error.message}`)
    return new Response(`Webhook Error: ${error.message}`, { status: 400 })
  }

  switch (event.type) {
    case 'checkout.session.completed':
      handleCheckoutSessionCompleted(event.data.object)
      break
    case 'invoice.payment_succeeded':
      handleInvoicePaymentSucceded(event.data.object)
      break
    case 'customer.subscription.created':
    case 'customer.subscription.updated':
    case 'customer.subscription.deleted':
      handleSubscriptionUpsert(event.data.object)
      break
    case 'product.created':
    case 'product.updated':
      handleProductUpsert(event.data.object)
      break
    case 'price.created':
    case 'price.updated':
      handlePriceUpsert(event.data.object)
      break
    default:
      console.log(`Unhandled event type ${event.type}`)
  }

  return new Response('{ "received": true }', { status: 200 })
}
