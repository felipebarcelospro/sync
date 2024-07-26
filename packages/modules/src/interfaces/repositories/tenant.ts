import { Tenant, TenantSettings } from '../../domain/entities/Tenant'
import { ChildPartial } from '../../types/child-partial'

export interface CreateTenantDTO {
  name: string
  slug: string
  paymentProviderId: string
  settings: ChildPartial<TenantSettings>
}

export interface UpdateTenantDTO {
  name?: string
  slug?: string
  logo?: string
  paymentProviderId?: string
  settings?: ChildPartial<TenantSettings>
}

export interface ITenantRepository {
  getBySlug: (slug: string) => Promise<Tenant | undefined>
  getById: (tenantId: string) => Promise<Tenant | undefined>
  getByExternalApiToken: (token: string) => Promise<Tenant | undefined>
  create: (data: CreateTenantDTO) => Promise<Tenant>
  update: (tenantId: string, data: Partial<UpdateTenantDTO>) => Promise<Tenant>
}
