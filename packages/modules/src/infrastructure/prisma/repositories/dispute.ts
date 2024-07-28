import { PrismaClient } from '@prisma/client'
import {
  IDisputeRepository,
  CreateDisputeDTO,
  UpdateDisputeDTO,
} from '../../../interfaces/repositories/dispute'
import { Dispute, DisputeStatus } from '../../../domain/entities/Dispute'

export class PrismaDisputeRepository implements IDisputeRepository {
  private prisma: PrismaClient

  constructor(prisma: PrismaClient) {
    this.prisma = prisma
  }

  async create(data: CreateDisputeDTO): Promise<Dispute> {
    const dispute = await this.prisma.dispute.create({
      data: {
        ...data,
        status: data.status as DisputeStatus,
      },
    })
    return this.mapToDomain(dispute)
  }

  async getById(id: string): Promise<Dispute | null> {
    const dispute = await this.prisma.dispute.findUnique({ where: { id } })
    return dispute ? this.mapToDomain(dispute) : null
  }

  async update(id: string, data: Partial<UpdateDisputeDTO>): Promise<Dispute> {
    const updatedDispute = await this.prisma.dispute.update({
      where: { id },
      data,
    })
    return this.mapToDomain(updatedDispute)
  }

  async delete(id: string): Promise<void> {
    await this.prisma.dispute.delete({ where: { id } })
  }

  async list(tenantId: string): Promise<Dispute[]> {
    const disputes = await this.prisma.dispute.findMany({ where: { tenantId } })
    return disputes.map(this.mapToDomain)
  }

  async getByPublicationId(publicationId: string): Promise<Dispute | null> {
    const dispute = await this.prisma.dispute.findUnique({
      where: { publicationId },
    })
    return dispute ? this.mapToDomain(dispute) : null
  }

  private mapToDomain(dispute: any): Dispute {
    return {
      id: dispute.id,
      reason: dispute.reason,
      resolution: dispute.resolution,
      attachments: dispute.attachments,
      status: dispute.status,
      createdById: dispute.createdById,
      tenantId: dispute.tenantId,
      publicationId: dispute.publicationId,
      resolvedAt: dispute.resolvedAt,
      createdAt: dispute.createdAt,
      updatedAt: dispute.updatedAt,
    }
  }
}
