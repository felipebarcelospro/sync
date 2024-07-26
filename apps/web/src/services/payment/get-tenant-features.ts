import { APP_CONFIGS } from '@/boilerplate.config'
import { db } from '@app/db'
import { startOfMonth, endOfMonth } from 'date-fns'
import { SubscriptionInfo } from './types/subscription-info'
import { FeatureInfo } from './types/feature-info'

export async function getTenantFeatures(
  tenantId: string,
  currentPlan: SubscriptionInfo['currentPlan'],
): Promise<FeatureInfo[]> {
  const features: FeatureInfo[] = []

  for (const item of Object.keys(currentPlan.metadata)) {
    const currentFeature = currentPlan.metadata[item]
    const currentFeatureTable = APP_CONFIGS.providers.billing.meta[item].table

    if (currentFeatureTable) {
      const availableOnSubscription = Number(currentFeature)
      const currentDate = new Date()
      const firstDayOfMonth = startOfMonth(currentDate)
      const lastDayOfMonth = endOfMonth(currentDate)

      const query: Record<string, any> = {
        tenantId,
      }

      if (item !== 'TEAM_MEMBERS') {
        query.createdAt = {
          gte: firstDayOfMonth,
          lte: lastDayOfMonth,
        }
      }

      const count: number = await (db[currentFeatureTable] as any).count({
        where: query,
      })

      features.push({
        id: item,
        available: true,
        quota: {
          total: availableOnSubscription,
          usage: count,
          available: availableOnSubscription - count,
          usageRate: (count / availableOnSubscription) * 100,
        },
      })
    }
  }

  return features
}
