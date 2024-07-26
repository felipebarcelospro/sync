import { IInviteRepository } from '../../../interfaces/repositories/invite'
import { ITenantRepository } from '../../../interfaces/repositories/tenant'
import { IUserRepository } from '../../../interfaces/repositories/user'

export class DeclineInviteUseCase {
  constructor(
    private readonly inviteRepository: IInviteRepository,
    private readonly userRepository: IUserRepository,
    private readonly tenantRepository: ITenantRepository,
  ) {}

  async execute({
    userId,
    inviteId,
  }: {
    userId: string
    inviteId: string
  }): Promise<void> {
    const invite = await this.inviteRepository.update(inviteId, {
      acceptedAt: new Date(),
    })
    if (!invite) {
      throw new Error('Invite not found or already accepted')
    }

    const tenantExists = await this.tenantRepository.getById(invite.tenantId)
    if (!tenantExists) {
      throw new Error('Tenant does not exist')
    }

    const userExists = await this.userRepository.getById(userId)
    if (!userExists) {
      throw new Error('User does not exist')
    }

    if (invite.acceptedAt) {
      throw new Error('Invite already accepted')
    }

    await this.inviteRepository.delete(inviteId)
  }
}
