import {
  IPlanRepository,
  PlanUpsertDTO,
} from '../../../interfaces/repositories/plan'
import { Plan } from '../../entities/Plan'

export class UpsertPlanUseCase {
  constructor(private planRepository: IPlanRepository) {}

  async execute(planDto: PlanUpsertDTO): Promise<Plan> {
    const plan = await this.planRepository.upsert(planDto)
    return plan
  }
}
