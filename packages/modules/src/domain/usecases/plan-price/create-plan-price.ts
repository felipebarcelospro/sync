import {
  IPlanPriceRepository,
  PlanPriceCreateDTO,
} from '../../../interfaces/repositories/plan-price'
import { PlanPrice } from '../../entities/PlanPrice'

export class CreatePlanPriceUseCase {
  constructor(private planPriceRepository: IPlanPriceRepository) {}

  async execute(planPriceDto: PlanPriceCreateDTO): Promise<PlanPrice> {
    const planPrice = await this.planPriceRepository.create(planPriceDto)
    return planPrice
  }
}
