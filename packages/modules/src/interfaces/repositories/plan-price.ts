import { PlanPrice } from '../../domain/entities/PlanPrice'

export interface PlanPriceCreateDTO {
  paymentProviderId: string
  planId: string
  active: boolean
  type: 'one_time' | 'recurring'
  price: number
  currency: string
  interval: 'day' | 'week' | 'month' | 'year'
  intervalCount: number
  trialPeriodDays?: number
}

export interface PlanPriceUpdateDTO {
  id: string
  active?: boolean
  price?: number
  intervalCount?: number
  trialPeriodDays?: number
}

export interface PlanPriceFindDTO {
  id: string
}

export interface IPlanPriceRepository {
  create(dto: PlanPriceCreateDTO): Promise<PlanPrice>
  update(dto: PlanPriceUpdateDTO): Promise<PlanPrice>
  getById(id: string): Promise<PlanPrice | null>
  getByProviderId(providerId: string): Promise<PlanPrice | null>
  getFreePlanPrice(): Promise<PlanPrice | null>
}
