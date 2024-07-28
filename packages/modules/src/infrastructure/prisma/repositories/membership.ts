import { PrismaClient } from '@prisma/client'
import {
  IMembershipRepository,
  CreateMembershipDTO,
  UpdateMembershipDTO,
} from '../../../interfaces/repositories/membership'
import { Membership, MembershipRole } from '../../../domain/entities/Membership'

export class PrismaMembershipRepository implements IMembershipRepository {
  private prisma: PrismaClient

  constructor(prisma: PrismaClient) {
    this.prisma = prisma
  }

  async list(tenantId: string, role?: MembershipRole): Promise<Membership[]> {
    const memberships = await this.prisma.membership.findMany({
      where: {
        tenantId,
        role,
      },
      include: {
        user: true,
        tenant: true,
      },
    })

    return memberships.map(this.mapToDomain)
  }

  async create(data: CreateMembershipDTO): Promise<Membership> {
    const membership = await this.prisma.membership.create({
      data: {
        userId: data.userId,
        tenantId: data.tenantId,
        role: data.role,
      },
    })

    return this.mapToDomain(membership)
  }

  async update(
    membershipId: string,
    data: UpdateMembershipDTO,
  ): Promise<Membership> {
    const membership = await this.prisma.membership.update({
      where: { id: membershipId },
      data: {
        role: data.role as MembershipRole,
      },
    })

    return this.mapToDomain(membership)
  }

  async delete(membershipId: string): Promise<void> {
    await this.prisma.membership.deleteMany({
      where: {
        id: membershipId,
      },
    })
  }

  async getById(membershipId: string): Promise<Membership | null> {
    const membership = await this.prisma.membership.findUnique({
      where: { id: membershipId },
      include: {
        user: true,
        tenant: true,
      },
    })

    if (!membership) return null
    return this.mapToDomain(membership)
  }

  async getByUserAndTenant(
    userId: string,
    tenantId: string,
  ): Promise<Membership | null> {
    const membership = await this.prisma.membership.findFirst({
      where: {
        userId,
        tenantId,
      },
      include: {
        user: true,
        tenant: true,
      },
    })

    if (!membership) return null
    return this.mapToDomain(membership)
  }

  private mapToDomain(membership: any): Membership {
    return {
      id: membership.id,
      tenantId: membership.tenantId,
      userId: membership.userId,
      role: membership.role,

      user: membership.user,
      tenant: membership.tenant,

      createdAt: membership.createdAt,
      updatedAt: membership.updatedAt,
      deletedAt: membership.deletedAt,
    }
  }
}
