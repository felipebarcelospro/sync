import { PrismaClient } from '@prisma/client'
import { PlanPrice } from '../../../domain/entities/PlanPrice'
import {
  IPlanPriceRepository,
  PlanPriceCreateDTO,
  PlanPriceUpdateDTO,
  PlanPriceFindDTO,
} from '../../../interfaces/repositories/plan-price'

export class PrismaPlanPriceRepository implements IPlanPriceRepository {
  private prisma: PrismaClient

  constructor(prisma: PrismaClient) {
    this.prisma = prisma
  }

  async create(dto: PlanPriceCreateDTO): Promise<PlanPrice> {
    const planPrice = await this.prisma.planPrice.create({
      data: dto,
    })

    return planPrice as PlanPrice
  }

  async update(dto: PlanPriceUpdateDTO): Promise<PlanPrice> {
    const planPrice = await this.prisma.planPrice.update({
      where: { id: dto.id },
      data: dto,
    })
    return planPrice as PlanPrice
  }

  async findUnique(dto: PlanPriceFindDTO): Promise<PlanPrice | null> {
    const planPrice = await this.prisma.planPrice.findUnique({
      where: { id: dto.id },
    })
    return planPrice as PlanPrice | null
  }

  async getById(id: string): Promise<PlanPrice | null> {
    const planPrice = await this.prisma.planPrice.findUnique({
      where: { id },
    })
    return planPrice as PlanPrice | null
  }

  async getByProviderId(providerId: string): Promise<PlanPrice | null> {
    const planPrice = await this.prisma.planPrice.findFirst({
      where: { paymentProviderId: providerId },
    })
    return planPrice as PlanPrice | null
  }

  async getFreePlanPrice(): Promise<PlanPrice | null> {
    const planPrice = await this.prisma.planPrice.findFirst({
      where: { price: 0, interval: 'month' },
    })
    return planPrice as PlanPrice | null
  }
}
