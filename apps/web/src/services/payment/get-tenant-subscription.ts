import { APP_CONFIGS } from '@/boilerplate.config'
import { db } from '@app/db'
import { getTenantFeatures } from './get-tenant-features'
import { interpolate } from '@/helpers/interpolate'
import { SubscriptionInfo } from './types/subscription-info'
import { PlanFeature } from './types/plan-feature'
import { PlanMetadata } from './types/plan-metadata'
import { FeatureInfo } from './types/feature-info'

export async function getTenantSubscription(
  tenantId: string,
): Promise<SubscriptionInfo | null> {
  async function getPlanById(id: string) {
    const plan = await db.plan.findUnique({
      where: { id },
      include: { prices: true },
    })

    const features = Object.keys(plan.metadata).map((key) => ({
      id: key,
      value: plan.metadata[key],
      label: interpolate(APP_CONFIGS.providers.billing.meta[key].label, {
        value: plan.metadata[key],
      }),
    })) as PlanFeature[]

    return { ...plan, features }
  }

  // Encontre a assinatura associada ao tenant
  const subscription = await db.subscription.findFirst({
    where: { tenantId },
    include: {
      tenant: true,
      price: true,
    },
  })

  const plan = await getPlanById(subscription.price.planId)

  const currentPlan = {
    id: plan.id,
    subscriptionPaymentProviderId: subscription.paymentProviderId,
    planPaymentProviderId: plan.paymentProviderId,
    pricePaymentProviderId: subscription.price.paymentProviderId,
    name: plan.name,
    metadata: plan.metadata as PlanMetadata,
    features: plan.features,
    status: subscription.status,
    startDate: subscription.createdAt,
    endDate: subscription.endedAt,
    price: subscription.price.price,
    paymentInterval: subscription.price.interval,
  }

  const features: FeatureInfo[] = await getTenantFeatures(
    subscription.tenant.id,
    currentPlan,
  )

  const trialInfo = {
    isInTrial: !!subscription.trialStart && !!subscription.trialEnd,
    trialStartDate: subscription.trialStart,
    trialEndDate: subscription.trialEnd,
  }

  const billingDetails = {
    nextPaymentDue: subscription.currentPeriodEnd,
    lastPaymentDate: subscription.currentPeriodStart,
  }

  return {
    currentPlan,
    features: features ?? [],
    trialInfo,
    billingDetails,
  }
}
