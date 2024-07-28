import type { Publication } from './Publication'
import type { Tenant } from './Tenant'

export interface Contract {
  id: string
  content?: Record<string, any>
  url?: string
  signedByClient: boolean
  signedDate?: Date

  publicationId: string
  publication?: Publication

  tenantId?: string
  tenant?: Tenant

  createdAt: Date
  updatedAt: Date
}
