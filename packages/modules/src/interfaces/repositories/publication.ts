import {
  Publication,
  PublicationStatus,
} from '../../domain/entities/Publication'

export interface CreatePublicationDTO {
  status: PublicationStatus
  details?: Record<string, any>
  tenantId: string
  customerId: string
  startDate?: Date
  endDate?: Date
}

export interface UpdatePublicationDTO {
  status?: PublicationStatus
  details?: Record<string, any>
  disputeId?: string
  contractId?: string
  reviewId?: string
  startDate?: Date
  endDate?: Date
}

export interface IPublicationRepository {
  create: (data: CreatePublicationDTO) => Promise<Publication>
  getById: (id: string) => Promise<Publication | null>
  update: (
    id: string,
    data: Partial<UpdatePublicationDTO>,
  ) => Promise<Publication>
  delete: (id: string) => Promise<void>
  list: (tenantId: string) => Promise<Publication[]>
  listByCustomer: (customerId: string) => Promise<Publication[]>
}
