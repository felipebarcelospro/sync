import { MembershipRole } from './Membership'

export interface Invite {
  id: string
  email: string
  tenantId: string

  role: MembershipRole
  tenant?: {
    id: string
    name: string
    slug: string
    logo: string
  }

  createdAt: Date
  updatedAt: Date
  expiresAt: Date
  acceptedAt?: Date
}
