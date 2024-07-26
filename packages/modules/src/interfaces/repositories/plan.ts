import { Plan } from '../../domain/entities/Plan'

export interface PlanUpsertDTO {
  paymentProviderId: string
  name: string
  description: string
  active: boolean
  metadata: any // Substitua `any` por um tipo específico conforme necessário.
}

export interface IPlanRepository {
  upsert(dto: PlanUpsertDTO): Promise<Plan>
  findByPlanId(planId: string): Promise<Plan | undefined>
  findByProviderId(providerId: string): Promise<Plan | undefined>
  list(): Promise<Plan[]>
}
