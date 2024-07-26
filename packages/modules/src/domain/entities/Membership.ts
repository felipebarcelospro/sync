export type MembershipRole = 'owner' | 'member'

export interface Membership {
  id: string
  userId: string
  tenantId: string
  role: MembershipRole

  user?: {
    id: string
    name: string
    email: string
    username: string
    image?: string
  }

  tenant?: {
    id: string
    name: string
    slug: string
    logo?: string
  }

  createdAt: Date
  updatedAt: Date
  deletedAt?: Date
}
