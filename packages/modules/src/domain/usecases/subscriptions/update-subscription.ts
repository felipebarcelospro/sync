import {
  ISubscriptionRepository,
  SubscriptionUpdateDTO,
} from '../../../interfaces/repositories/subscription'
import { Subscription } from '../../entities/Subscription'

export class UpdateSubscriptionUseCase {
  constructor(private subscriptionRepository: ISubscriptionRepository) {}

  async execute(dto: SubscriptionUpdateDTO): Promise<Subscription> {
    const subscriptionExists = await this.subscriptionRepository.findUnique({
      paymentProviderId: dto.paymentProviderId,
    })
    if (!subscriptionExists) {
      throw new Error('Subscription does not exist')
    }

    const updatedSubscription = await this.subscriptionRepository.update(dto)
    return updatedSubscription
  }
}
