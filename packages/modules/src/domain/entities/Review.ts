import type { Publication } from './Publication'

export interface Review {
  id: string
  rating: number
  comment?: string

  publicationId?: string
  publication?: Publication

  createdAt: Date
  updatedAt: Date
}
