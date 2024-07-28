import { PrismaClient } from '@prisma/client'
import {
  IContractRepository,
  CreateContractDTO,
  UpdateContractDTO,
} from '../../../interfaces/repositories/contract'
import { Contract } from '../../../domain/entities/Contract'

export class PrismaContractRepository implements IContractRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(data: CreateContractDTO): Promise<Contract> {
    const contract = await this.prisma.contract.create({ data })
    return this.mapToDomain(contract)
  }

  async getById(id: string): Promise<Contract | null> {
    const contract = await this.prisma.contract.findUnique({ where: { id } })
    return contract ? this.mapToDomain(contract) : null
  }

  async update(
    id: string,
    data: Partial<UpdateContractDTO>,
  ): Promise<Contract> {
    const updatedContract = await this.prisma.contract.update({
      where: { id },
      data,
    })
    return this.mapToDomain(updatedContract)
  }

  async delete(id: string): Promise<void> {
    await this.prisma.contract.delete({ where: { id } })
  }

  async list(tenantId: string): Promise<Contract[]> {
    const contracts = await this.prisma.contract.findMany({
      where: { tenantId },
    })

    return contracts.map(this.mapToDomain)
  }

  async getByPublicationId(publicationId: string): Promise<Contract | null> {
    const contract = await this.prisma.contract.findUnique({
      where: { publicationId },
    })

    return contract ? this.mapToDomain(contract) : null
  }

  private mapToDomain(contract: any): Contract {
    return {
      id: contract.id,
      content: contract.content,
      url: contract.url,
      signedByClient: contract.signedByClient,
      signedDate: contract.signedDate,
      publicationId: contract.publicationId,
      publication: contract.publication,
      tenantId: contract.tenantId,
      tenant: contract.tenant,
      createdAt: contract.createdAt,
      updatedAt: contract.updatedAt,
    }
  }
}
