import {
  ISubscriptionRepository,
  SubscriptionFirstDTO,
} from '../../../interfaces/repositories/subscription'
import { ITenantRepository } from '../../../interfaces/repositories/tenant'
import { Subscription } from '../../entities/Subscription'

export class GetFirstSubscriptionOfTenantUseCase {
  constructor(
    private subscriptionRepository: ISubscriptionRepository,
    private tenantRepository: ITenantRepository,
  ) {}

  async execute(tenantId: string): Promise<Subscription | null> {
    const tenantExists = await this.tenantRepository.getById(tenantId)
    if (!tenantExists) {
      throw new Error('Tenant does not exist')
    }

    const subscription = await this.subscriptionRepository.findFirst({
      tenantId,
    } as SubscriptionFirstDTO)
    if (!subscription) {
      return null
    }

    return subscription
  }
}
