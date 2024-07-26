import { SubscriptionInfo } from '@/services/payment/types/subscription-info'
import { Tenant } from '@app/modules/src/domain/entities/Tenant'

export type TenantModel = Tenant & {
  subscription: SubscriptionInfo
}
