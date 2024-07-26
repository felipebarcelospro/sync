import { IPlanPriceRepository } from '../../../interfaces/repositories/plan-price'
import {
  ISubscriptionRepository,
  SubscriptionCreateDTO,
} from '../../../interfaces/repositories/subscription'
import { ITenantRepository } from '../../../interfaces/repositories/tenant'
import { Subscription } from '../../entities/Subscription'

export class CreateSubscriptionUseCase {
  constructor(
    private subscriptionRepository: ISubscriptionRepository,
    private tenantRepository: ITenantRepository,
    private planPriceRepository: IPlanPriceRepository,
  ) {}

  async execute(dto: SubscriptionCreateDTO): Promise<Subscription> {
    const tenantExists = await this.tenantRepository.getById(dto.tenantId)
    if (!tenantExists) {
      throw new Error('Tenant does not exist')
    }

    const planPriceExists = await this.planPriceRepository.getById(
      dto.priceId as string,
    )
    if (!planPriceExists) {
      throw new Error('Plan price does not exist')
    }

    const subscription = await this.subscriptionRepository.create(dto)
    return subscription
  }
}
