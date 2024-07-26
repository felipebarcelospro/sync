import {
  IPlanPriceRepository,
  PlanPriceUpdateDTO,
} from '../../../interfaces/repositories/plan-price'
import { PlanPrice } from '../../entities/PlanPrice'

export class UpdatePlanPriceUseCase {
  constructor(private planPriceRepository: IPlanPriceRepository) {}

  async execute(planPriceDto: PlanPriceUpdateDTO): Promise<PlanPrice> {
    const planPriceExists = await this.planPriceRepository.getById(
      planPriceDto.id,
    )
    if (!planPriceExists) {
      throw new Error('Plan price does not exist')
    }

    const updatedPlanPrice = await this.planPriceRepository.update(planPriceDto)
    return updatedPlanPrice
  }
}
