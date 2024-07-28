import { PrismaClient } from '@prisma/client'
import {
  IPublicationRepository,
  CreatePublicationDTO,
  UpdatePublicationDTO,
} from '../../../interfaces/repositories/publication'
import {
  Publication,
  PublicationStatus,
} from '../../../domain/entities/Publication'

export class PrismaPublicationRepository implements IPublicationRepository {
  private prisma: PrismaClient

  constructor(prisma: PrismaClient) {
    this.prisma = prisma
  }

  async create(data: CreatePublicationDTO): Promise<Publication> {
    const publication = await this.prisma.publication.create({
      data: {
        ...data,
        status: data.status as PublicationStatus,
      },
    })
    return this.mapToDomain(publication)
  }

  async getById(id: string): Promise<Publication | null> {
    const publication = await this.prisma.publication.findUnique({
      where: { id },
    })
    return publication ? this.mapToDomain(publication) : null
  }

  async update(
    id: string,
    data: Partial<UpdatePublicationDTO>,
  ): Promise<Publication> {
    const updatedPublication = await this.prisma.publication.update({
      where: { id },
      data,
    })
    return this.mapToDomain(updatedPublication)
  }

  async delete(id: string): Promise<void> {
    await this.prisma.publication.delete({ where: { id } })
  }

  async list(tenantId: string): Promise<Publication[]> {
    const publications = await this.prisma.publication.findMany({
      where: { tenantId },
    })
    return publications.map(this.mapToDomain)
  }

  async listByCustomer(customerId: string): Promise<Publication[]> {
    const publications = await this.prisma.publication.findMany({
      where: { customerId },
    })
    return publications.map(this.mapToDomain)
  }

  private mapToDomain(publication: any): Publication {
    return {
      id: publication.id,
      status: publication.status,
      details: publication.details,
      tenantId: publication.tenantId,
      customerId: publication.customerId,
      disputeId: publication.disputeId,
      contractId: publication.contractId,
      reviewId: publication.reviewId,
      createdAt: publication.createdAt,
      updatedAt: publication.updatedAt,
      startDate: publication.startDate,
      endDate: publication.endDate,
    }
  }
}
