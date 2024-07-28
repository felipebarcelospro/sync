import { Review } from '../../domain/entities/Review'

export interface CreateReviewDTO {
  rating: number
  comment?: string
  publicationId?: string
  createdBy: string
}

export interface UpdateReviewDTO {
  rating?: number
  comment?: string
}

export interface IReviewRepository {
  create: (data: CreateReviewDTO) => Promise<Review>
  getById: (id: string) => Promise<Review | null>
  update: (id: string, data: Partial<UpdateReviewDTO>) => Promise<Review>
  delete: (id: string) => Promise<void>
  getByPublicationId: (publicationId: string) => Promise<Review | null>
}
