import type { Membership } from './Membership'
import type { Publication } from './Publication'

export interface Message {
  id: string
  content: string

  senderId?: string
  sender?: Membership

  receiverId: string
  receiver?: Membership

  publicationId?: string
  publication?: Publication

  createdAt: Date
  updatedAt: Date
}
