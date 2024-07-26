import { PrismaClient } from '@prisma/client'
import {
  IUserRepository,
  UpdateUserDTO,
} from '../../../interfaces/repositories/user'
import { User } from '../../../domain/entities/User'
import { DeepPartial } from '../../json-parser/json-parser'

export class PrismaUserRepository implements IUserRepository {
  private prisma: PrismaClient

  constructor(prisma: PrismaClient) {
    this.prisma = prisma
  }

  async getById(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        memberships: {
          include: {
            tenant: true,
          },
        },
      },
    })

    if (!user) {
      throw new Error('User not found')
    }

    return this.toDomain(user)
  }

  async getByUsername(username: string): Promise<User> {
    const user = await this.prisma.user.findFirst({
      where: { username },
      include: {
        memberships: {
          include: {
            tenant: true,
          },
        },
      },
    })

    if (!user) {
      throw new Error('User not found')
    }

    return this.toDomain(user)
  }

  async update(id: string, data: DeepPartial<UpdateUserDTO>): Promise<User> {
    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: {
        name: data.name,
        username: data.username,
        image: data.image,
        settings: JSON.stringify(data.settings),
      },
    })

    return this.toDomain(updatedUser)
  }

  private toDomain(model: any): User {
    return {
      id: model.id,
      email: model.email,
      name: model.name,
      emailVerified: model.emailVerified,
      username: model.username,
      settings: model.settings,
      memberships: model.memberships,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    }
  }
}
