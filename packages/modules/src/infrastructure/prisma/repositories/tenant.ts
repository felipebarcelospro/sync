import { PrismaClient } from '@prisma/client'
import { Tenant } from '../../../domain/entities/Tenant'
import {
  CreateTenantDTO,
  ITenantRepository,
  UpdateTenantDTO,
} from '../../../interfaces/repositories/tenant'

export class PrismaTenantRepository implements ITenantRepository {
  private prisma: PrismaClient

  constructor(prisma: PrismaClient) {
    this.prisma = prisma
  }

  async getBySlug(slug: string): Promise<Tenant | undefined> {
    const tenant = await this.prisma.tenant.findUnique({
      where: { slug },
    })

    if (!tenant) return undefined

    return this.toDomain(tenant)
  }

  async getById(tenantId: string): Promise<Tenant | undefined> {
    const tenant = await this.prisma.tenant.findUnique({
      where: { id: tenantId },
    })

    if (!tenant) return undefined

    return this.toDomain(tenant)
  }

  async getByExternalApiToken(token: string): Promise<Tenant | undefined> {
    const tenant = await this.prisma.tenant.findFirst({
      where: {
        settings: {
          path: ['integrations', 'external', 'token'],
          equals: token,
        },
      },
    })

    if (!tenant) return undefined

    return this.toDomain(tenant)
  }

  async create(data: CreateTenantDTO): Promise<Tenant> {
    const tenant = await this.prisma.tenant.create({
      data: {
        name: data.name,
        slug: data.slug,
        settings: data.settings, // Assuming default settings
      },
    })

    return this.toDomain(tenant)
  }

  async update(
    tenantId: string,
    data: Partial<UpdateTenantDTO>,
  ): Promise<Tenant> {
    const tenant = await this.prisma.tenant.update({
      where: { id: tenantId },
      data: {
        name: data.name,
        slug: data.slug,
        logo: data.logo,
        paymentProviderId: data.paymentProviderId,
        settings: data.settings,
      },
    })

    return this.toDomain(tenant)
  }

  private toDomain(model: any): Tenant {
    return {
      id: model.id,
      name: model.name,
      slug: model.slug,
      logo: model.logo,
      settings: model.settings,
      paymentProviderId: model.paymentProviderId,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
      deletedAt: model.deletedAt,
    }
  }
}
