import { IPlanPriceRepository } from '../../../interfaces/repositories/plan-price'
import { PlanPrice } from '../../entities/PlanPrice'

export class GetPlanPriceByIdUseCase {
  constructor(private planPriceRepository: IPlanPriceRepository) {}

  async execute(planPriceId: string): Promise<PlanPrice | null> {
    const planPrice = await this.planPriceRepository.getById(planPriceId)
    if (!planPrice) {
      throw new Error('Plan price does not exist')
    }

    return planPrice
  }
}
