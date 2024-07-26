import { APP_CONFIGS } from '@/boilerplate.config'
import { getTenantSubscription } from './get-tenant-subscription'

export async function getTenantFeatureQuota(
  tenantId: string,
  feature: keyof typeof APP_CONFIGS.providers.billing.meta,
) {
  const subscription = await getTenantSubscription(tenantId)

  const subscriptionFeature = subscription.features.find(
    (item) => item.id === feature,
  )

  if (subscriptionFeature.quota.usageRate >= 100) {
    return {
      available: false,
      quota: subscriptionFeature.quota.available,
    }
  }

  return {
    available: true,
    quota: subscriptionFeature.quota.available,
  }
}
