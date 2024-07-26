import {
  IPlanPriceRepository,
  PlanPriceCreateDTO,
} from '../../../interfaces/repositories/plan-price'
import { PlanPrice } from '../../entities/PlanPrice'

export class UpsertPlanPriceUseCase {
  constructor(private planPriceRepository: IPlanPriceRepository) {}

  async execute(dto: PlanPriceCreateDTO): Promise<PlanPrice> {
    const existingPlanPrice = await this.planPriceRepository.getByProviderId(
      dto.paymentProviderId,
    )

    if (existingPlanPrice) {
      const updatedPlanPrice = await this.planPriceRepository.update({
        id: existingPlanPrice.id,
        ...dto,
      })
      return updatedPlanPrice
    } else {
      const newPlanPrice = await this.planPriceRepository.create(dto)
      return newPlanPrice
    }
  }
}
