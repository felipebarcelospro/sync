import { PrismaClient } from '@prisma/client'
import {
  ISubscriptionRepository,
  SubscriptionCreateDTO,
  SubscriptionFirstDTO,
  SubscriptionUniqueDTO,
  SubscriptionUpdateDTO,
} from '../../../interfaces/repositories/subscription'
import { Subscription } from '../../../domain/entities/Subscription'

export class PrismaSubscriptionRepository implements ISubscriptionRepository {
  private prisma: PrismaClient

  constructor(prisma: PrismaClient) {
    this.prisma = prisma
  }

  async findUnique(dto: SubscriptionUniqueDTO): Promise<Subscription> {
    const subscription = await this.prisma.subscription.findUnique({
      where: {
        paymentProviderId: dto.paymentProviderId,
      },
    })

    if (!subscription) {
      throw new Error('Subscription not found')
    }

    return subscription as Subscription
  }

  async update(dto: SubscriptionUpdateDTO): Promise<Subscription> {
    const subscription = await this.prisma.subscription.update({
      where: {
        paymentProviderId: dto.paymentProviderId,
      },
      data: dto,
    })

    return subscription as Subscription
  }

  async findFirst(dto: SubscriptionFirstDTO): Promise<Subscription | null> {
    const subscription = await this.prisma.subscription.findFirst({
      where: {
        tenantId: dto.tenantId,
      },
    })

    return subscription as Subscription | null
  }

  async create(dto: SubscriptionCreateDTO): Promise<Subscription> {
    const subscription = await this.prisma.subscription.create({
      data: dto,
    })

    return subscription as Subscription
  }
}
