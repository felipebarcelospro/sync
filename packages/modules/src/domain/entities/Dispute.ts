import type { Membership } from './Membership'
import type { Publication } from './Publication'
import type { Tenant } from './Tenant'

export type DisputeStatus =
  | 'OPEN'
  | 'RESOLVED_FAVOR_CLIENT'
  | 'RESOLVED_FAVOR_INFLUENCER'
  | 'CLOSED'

export interface Dispute {
  id: string
  reason: string
  resolution?: string
  attachments?: Record<string, any>
  status: DisputeStatus

  createdById: string
  createdBy?: Membership

  tenantId?: string
  tenant?: Tenant

  publicationId?: string
  publication?: Publication

  resolvedAt?: Date
  createdAt: Date
  updatedAt: Date
}
