import { IPlanRepository } from '../../../interfaces/repositories/plan'
import { Plan } from '../../entities/Plan'

export class GetPlanByIdUseCase {
  constructor(private planRepository: IPlanRepository) {}

  async execute(planId: string): Promise<Plan | undefined> {
    const plan = await this.planRepository.findByPlanId(planId)
    return plan
  }
}
