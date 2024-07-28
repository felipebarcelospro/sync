import type { Tenant } from './Tenant'
import type { User } from './User'

export type MembershipRole = 'OWNER' | 'MEMBER' | 'CUSTOMER'

export interface Membership {
  id: string
  role: MembershipRole
  settings?: Record<string, any>

  tenantId: string
  tenant: Tenant

  userId: string
  user: User

  createdAt: Date
  updatedAt: Date
  deletedAt?: Date

  _count?: {
    publications: number
  }
}
