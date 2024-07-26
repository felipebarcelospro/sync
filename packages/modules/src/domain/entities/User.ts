import { Membership } from './Membership'

export interface UserSettings {
  contact: {
    phone?: string
  }
  utms: {
    utm_source?: string
    utm_medium?: string
    utm_campaign?: string
    utm_term?: string
    utm_content?: string
  }
}

export interface User {
  id: string
  email: string
  name: string
  emailVerified: boolean
  username: string
  image?: string

  settings: UserSettings
  memberships?: Membership[]

  createdAt: Date
  updatedAt: Date
}
