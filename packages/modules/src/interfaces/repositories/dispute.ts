import { Dispute, DisputeStatus } from '../../domain/entities/Dispute'

export interface CreateDisputeDTO {
  reason: string
  attachments?: Record<string, any>
  status: DisputeStatus
  createdById: string
  tenantId?: string
  publicationId?: string
}

export interface UpdateDisputeDTO {
  resolution?: string
  status?: DisputeStatus
  resolvedAt?: Date
}

export interface IDisputeRepository {
  create: (data: CreateDisputeDTO) => Promise<Dispute>
  getById: (id: string) => Promise<Dispute | null>
  update: (id: string, data: Partial<UpdateDisputeDTO>) => Promise<Dispute>
  delete: (id: string) => Promise<void>
  list: (tenantId: string) => Promise<Dispute[]>
  getByPublicationId: (publicationId: string) => Promise<Dispute | null>
}
