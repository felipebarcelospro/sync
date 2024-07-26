import {
  ISubscriptionRepository,
  SubscriptionUpdateDTO,
} from '../../../interfaces/repositories/subscription'
import { ITenantRepository } from '../../../interfaces/repositories/tenant'
import { IPlanPriceRepository } from '../../../interfaces/repositories/plan-price'
import { Subscription } from '../../entities/Subscription'

export class CancelSubscriptionUseCase {
  constructor(
    private subscriptionRepository: ISubscriptionRepository,
    private tenantRepository: ITenantRepository,
    private planPriceRepository: IPlanPriceRepository,
  ) {}

  async execute(subscriptionId: string): Promise<Subscription> {
    const subscription = await this.subscriptionRepository.findUnique({
      paymentProviderId: subscriptionId,
    })
    if (!subscription) {
      throw new Error('Subscription does not exist')
    }

    const tenantExists = await this.tenantRepository.getById(
      subscription.tenantId,
    )
    if (!tenantExists) {
      throw new Error('Tenant does not exist')
    }

    const planPriceExists = await this.planPriceRepository.getById(
      subscription.priceId,
    )
    if (!planPriceExists) {
      throw new Error('Plan price does not exist')
    }

    const updatedSubscription = await this.subscriptionRepository.update({
      ...subscription,
      status: 'cancelled',
      canceledAt: new Date(),
    } as SubscriptionUpdateDTO)

    return updatedSubscription
  }
}
