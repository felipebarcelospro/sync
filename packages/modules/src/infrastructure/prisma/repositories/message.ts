import { PrismaClient } from '@prisma/client'
import {
  IMessageRepository,
  CreateMessageDTO,
} from '../../../interfaces/repositories/message'
import { Message } from '../../../domain/entities/Message'

export class PrismaMessageRepository implements IMessageRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(data: CreateMessageDTO): Promise<Message> {
    const message = await this.prisma.message.create({ data })
    return this.mapToDomain(message)
  }

  async getById(id: string): Promise<Message | null> {
    const message = await this.prisma.message.findUnique({ where: { id } })
    return message ? this.mapToDomain(message) : null
  }

  async delete(id: string): Promise<void> {
    await this.prisma.message.delete({ where: { id } })
  }

  async list(publicationId: string): Promise<Message[]> {
    const messages = await this.prisma.message.findMany({
      where: { publicationId },
      include: {
        sender: {
          include: {
            user: true,
          },
        },
      },
    })

    return messages.map(this.mapToDomain)
  }

  async listByReceiver(receiverId: string): Promise<Message[]> {
    const messages = await this.prisma.message.findMany({
      where: { receiverId },
      include: {
        sender: {
          include: {
            user: true,
          },
        },
        receiver: {
          include: {
            user: true,
          },
        },
        publication: true,
      },
    })

    return messages.map(this.mapToDomain)
  }

  private mapToDomain(message: any): Message {
    return {
      id: message.id,
      content: message.content,
      senderId: message.senderId,
      sender: message.sender,
      receiverId: message.receiverId,
      receiver: message.receiver,
      publicationId: message.publicationId,
      publication: message.publication,
      createdAt: message.createdAt,
      updatedAt: message.updatedAt,
    }
  }
}
