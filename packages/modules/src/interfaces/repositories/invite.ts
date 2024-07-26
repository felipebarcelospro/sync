import { Invite } from '../../domain/entities/Invite'
import { MembershipRole } from '../../domain/entities/Membership'

export interface CreateInviteDTO {
  email: string
  role: MembershipRole

  expiresAt: Date
  acceptedAt?: Date
}

export interface UpdateInviteDTO {
  role: MembershipRole
  expiresAt: Date
  acceptedAt: Date
}

export interface IInviteRepository {
  create: (tenantId: string, data: CreateInviteDTO) => Promise<Invite>
  getById: (id: string) => Promise<Invite | null>
  update: (id: string, data: Partial<UpdateInviteDTO>) => Promise<Invite>
  delete: (id: string) => Promise<void>
  list: (tenantId: string) => Promise<Invite[]>
  getByEmailAndTenantId: (
    email: string,
    tenantId: string,
  ) => Promise<Invite | null>
}
