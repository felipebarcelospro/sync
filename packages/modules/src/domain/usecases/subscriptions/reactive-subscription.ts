import {
  ISubscriptionRepository,
  SubscriptionUpdateDTO,
} from '../../../interfaces/repositories/subscription'
import { IPlanPriceRepository } from '../../../interfaces/repositories/plan-price'
import { IPlanRepository } from '../../../interfaces/repositories/plan'
import { ITenantRepository } from '../../../interfaces/repositories/tenant'
import { Subscription } from '../../entities/Subscription'

export class ReactiveSubscriptionUseCase {
  constructor(
    private subscriptionRepository: ISubscriptionRepository,
    private tenantRepository: ITenantRepository,
    private planPriceRepository: IPlanPriceRepository,
    private planRepository: IPlanRepository,
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

    const planExists = await this.planRepository.findByPlanId(
      planPriceExists.planId,
    )
    if (!planExists) {
      throw new Error('Plan does not exist')
    }

    const updatedSubscription = await this.subscriptionRepository.update({
      ...subscription,
      status: 'active',
      canceledAt: undefined,
    } as SubscriptionUpdateDTO)

    return updatedSubscription
  }
}
