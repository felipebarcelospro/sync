import { PrismaClient } from '@prisma/client'
import {
  IInviteRepository,
  CreateInviteDTO,
  UpdateInviteDTO,
} from '../../../interfaces/repositories/invite'
import { Invite } from '../../../domain/entities/Invite'
import { MembershipRole } from '../../../domain/entities/Membership'

export class PrismaInviteRepository implements IInviteRepository {
  private prisma: PrismaClient

  constructor(prisma: PrismaClient) {
    this.prisma = prisma
  }

  async create(tenantId: string, data: CreateInviteDTO): Promise<Invite> {
    const invite = await this.prisma.invite.create({
      data: {
        email: data.email,
        role: data.role as MembershipRole,
        expiresAt: data.expiresAt,
        acceptedAt: data.acceptedAt,
        tenantId,
      },
    })

    return this.mapToDomain(invite)
  }

  async update(id: string, data: Partial<UpdateInviteDTO>): Promise<Invite> {
    const updatedInvite = await this.prisma.invite.update({
      where: { id },
      data,
    })
    return this.mapToDomain(updatedInvite)
  }

  async getById(id: string): Promise<Invite | null> {
    const invite = await this.prisma.invite.findUnique({
      where: { id },
      include: {
        tenant: true,
      },
    })
    return invite ? this.mapToDomain(invite) : null
  }

  async delete(id: string): Promise<void> {
    await this.prisma.invite.delete({
      where: { id },
    })
  }

  async list(tenantId: string): Promise<Invite[]> {
    const invites = await this.prisma.invite.findMany({
      where: { tenantId },
    })

    return invites.map((invite) => this.mapToDomain(invite))
  }

  async getByEmailAndTenantId(
    email: string,
    tenantId: string,
  ): Promise<Invite | null> {
    const invite = await this.prisma.invite.findFirst({
      where: {
        email,
        tenantId,
      },
    })
    return invite ? this.mapToDomain(invite) : null
  }

  private mapToDomain(invite: any): Invite {
    return {
      id: invite.id,
      tenantId: invite.tenantId,
      email: invite.email,
      role: invite.role,
      tenant: invite.tenant,
      expiresAt: invite.expiresAt,
      acceptedAt: invite.acceptedAt,
      createdAt: invite.createdAt,
      updatedAt: invite.updatedAt,
    }
  }
}
