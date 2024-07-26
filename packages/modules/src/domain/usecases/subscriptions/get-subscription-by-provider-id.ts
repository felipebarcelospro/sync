import {
  ISubscriptionRepository,
  SubscriptionUniqueDTO,
} from '../../../interfaces/repositories/subscription'
import { Subscription } from '../../entities/Subscription'

export class GetSubscriptionByProviderIdUseCase {
  constructor(private subscriptionRepository: ISubscriptionRepository) {}

  async execute(providerId: string): Promise<Subscription> {
    const subscription = await this.subscriptionRepository.findUnique({
      paymentProviderId: providerId,
    } as SubscriptionUniqueDTO)
    if (!subscription) {
      throw new Error('Subscription does not exist')
    }

    return subscription
  }
}
