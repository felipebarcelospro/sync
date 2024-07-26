import { Membership, MembershipRole } from '../../domain/entities/Membership'

export interface CreateMembershipDTO {
  tenantId: string
  userId: string
  role: MembershipRole
}

export interface UpdateMembershipDTO {
  role: MembershipRole
}

export interface IMembershipRepository {
  list: (tenantId: string) => Promise<Membership[]>
  delete: (membershipId: string) => Promise<void>
  create: (data: CreateMembershipDTO) => Promise<Membership>
  getByUserOnTenant: (
    userId: string,
    tenantId: string,
  ) => Promise<Membership | null>
  getById: (membershipId: string) => Promise<Membership | null>
  update: (
    membershipId: string,
    data: UpdateMembershipDTO,
  ) => Promise<Membership>
}
