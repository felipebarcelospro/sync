import { Contract } from '../../domain/entities/Contract'

export interface CreateContractDTO {
  content?: Record<string, any>
  url?: string
  signedByClient: boolean
  signedDate?: Date
  publicationId: string
  membershipId?: string
  tenantId?: string
}

export interface UpdateContractDTO {
  content?: Record<string, any>
  url?: string
  signedByClient?: boolean
  signedDate?: Date
}

export interface IContractRepository {
  create: (data: CreateContractDTO) => Promise<Contract>
  getById: (id: string) => Promise<Contract | null>
  update: (id: string, data: Partial<UpdateContractDTO>) => Promise<Contract>
  delete: (id: string) => Promise<void>
  list: (tenantId: string) => Promise<Contract[]>
  getByPublicationId: (publicationId: string) => Promise<Contract | null>
}
