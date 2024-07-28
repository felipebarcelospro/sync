import { PrismaClient } from '@prisma/client'
import {
  IReviewRepository,
  CreateReviewDTO,
  UpdateReviewDTO,
} from '../../../interfaces/repositories/review'
import { Review } from '../../../domain/entities/Review'

export class PrismaReviewRepository implements IReviewRepository {
  private prisma: PrismaClient

  constructor(prisma: PrismaClient) {
    this.prisma = prisma
  }

  async create(data: CreateReviewDTO): Promise<Review> {
    const review = await this.prisma.review.create({ data })
    return this.mapToDomain(review)
  }

  async getById(id: string): Promise<Review | null> {
    const review = await this.prisma.review.findUnique({ where: { id } })
    return review ? this.mapToDomain(review) : null
  }

  async update(id: string, data: Partial<UpdateReviewDTO>): Promise<Review> {
    const updatedReview = await this.prisma.review.update({
      where: { id },
      data,
    })
    return this.mapToDomain(updatedReview)
  }

  async delete(id: string): Promise<void> {
    await this.prisma.review.delete({ where: { id } })
  }

  async getByPublicationId(publicationId: string): Promise<Review | null> {
    const review = await this.prisma.review.findUnique({
      where: { publicationId },
      include: {
        publication: true,
      },
    })

    return review ? this.mapToDomain(review) : null
  }

  private mapToDomain(review: any): Review {
    return {
      id: review.id,
      rating: review.rating,
      comment: review.comment,
      publicationId: review.publicationId,
      createdAt: review.createdAt,
      updatedAt: review.updatedAt,
    }
  }
}
