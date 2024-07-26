import {
  IPlanRepository,
  PlanUpsertDTO,
} from '../../../interfaces/repositories/plan'
import { Plan } from '../../../domain/entities/Plan'
import { PrismaClient } from '@prisma/client'

export class PrismaPlanRepository implements IPlanRepository {
  private prisma: PrismaClient

  constructor(prisma: PrismaClient) {
    this.prisma = prisma
  }

  async upsert(dto: PlanUpsertDTO): Promise<Plan> {
    const plan = await this.prisma.plan.upsert({
      where: { paymentProviderId: dto.paymentProviderId },
      update: dto,
      create: dto,
    })

    return plan as Plan
  }

  async findByPlanId(planId: string): Promise<Plan | undefined> {
    const plan = await this.prisma.plan.findUnique({
      where: { id: planId },
    })

    return plan as Plan | undefined
  }

  async findByProviderId(providerId: string): Promise<Plan | undefined> {
    const plan = await this.prisma.plan.findFirst({
      where: { paymentProviderId: providerId },
    })

    return plan as Plan | undefined
  }

  async list(): Promise<Plan[]> {
    return this.prisma.plan.findMany({
      include: {
        prices: true,
      },
    }) as Promise<Plan[]>
  }
}
