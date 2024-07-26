import { IPlanRepository } from '../../../interfaces/repositories/plan'
import { Plan } from '../../entities/Plan'

export class GetPlansUseCase {
  constructor(private planRepository: IPlanRepository) {}

  async execute(): Promise<Plan[]> {
    return this.planRepository.list()
  }
}
