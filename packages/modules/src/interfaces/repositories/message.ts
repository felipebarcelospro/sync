import { Message } from '../../domain/entities/Message'

export interface CreateMessageDTO {
  content: string
  senderId?: string
  receiverId: string
  publicationId?: string
}

export interface IMessageRepository {
  create: (data: CreateMessageDTO) => Promise<Message>
  getById: (id: string) => Promise<Message | null>
  delete: (id: string) => Promise<void>
  list: (publicationId: string) => Promise<Message[]>
  listByReceiver: (receiverId: string) => Promise<Message[]>
}
