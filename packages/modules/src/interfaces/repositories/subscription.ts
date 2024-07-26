import { Subscription } from '../../domain/entities/Subscription'

export interface SubscriptionUniqueDTO {
  paymentProviderId: string
}

export interface SubscriptionUpdateDTO {
  paymentProviderId?: string
  status?: string
  cancelAtPeriodEnd?: boolean
  cancelAt?: Date
  canceledAt?: Date
  currentPeriodStart?: Date
  currentPeriodEnd?: Date
  endedAt?: Date
  trialStart?: Date
  trialEnd?: Date
  createdAt?: Date
  priceId?: string
}

export interface SubscriptionFirstDTO {
  tenantId: string
}

export interface SubscriptionCreateDTO extends SubscriptionUpdateDTO {
  tenantId: string
  status: string
  priceId: string
}

export interface ISubscriptionRepository {
  findUnique(dto: SubscriptionUniqueDTO): Promise<Subscription>
  update(dto: SubscriptionUpdateDTO): Promise<Subscription>
  findFirst(dto: SubscriptionFirstDTO): Promise<Subscription | null>
  create(dto: SubscriptionCreateDTO): Promise<Subscription>
}
