export interface TenantSettings {
  billing: {
    email?: string
  }
  emails: {
    usageExceededSentAt?: string
  }
  integrations: {
    external: {
      token?: string
    }
    slack: {
      url?: string
    }
    discord: {
      url?: string
    }
    webhook: {
      url?: string
    }
  }
}

export interface Tenant {
  id: string
  name: string
  slug: string
  logo?: string
  settings: TenantSettings

  paymentProviderId?: string

  createdAt: Date
  updatedAt: Date
  deletedAt?: Date
}
