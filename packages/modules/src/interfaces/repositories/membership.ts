import { Membership, MembershipRole } from '../../domain/entities/Membership'

export interface CreateMembershipDTO {
  role: MembershipRole
  settings?: Record<string, any>
  tenantId: string
  userId: string
}

export interface UpdateMembershipDTO {
  role?: MembershipRole
  settings?: Record<string, any>
  deletedAt?: Date | null
}

export interface IMembershipRepository {
  create: (data: CreateMembershipDTO) => Promise<Membership>
  getById: (id: string) => Promise<Membership | null>
  update: (
    id: string,
    data: Partial<UpdateMembershipDTO>,
  ) => Promise<Membership>
  delete: (id: string) => Promise<void>
  list: (tenantId: string, role?: MembershipRole) => Promise<Membership[]>
  getByUserAndTenant: (
    userId: string,
    tenantId: string,
  ) => Promise<Membership | null>
}
