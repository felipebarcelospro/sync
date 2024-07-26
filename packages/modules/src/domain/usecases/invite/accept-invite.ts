import { IInviteRepository } from '../../../interfaces/repositories/invite'
import { IMembershipRepository } from '../../../interfaces/repositories/membership'
import { ITenantRepository } from '../../../interfaces/repositories/tenant'
import { IUserRepository } from '../../../interfaces/repositories/user'
import { Invite } from '../../entities/Invite'

export class AcceptInviteUseCase {
  constructor(
    private readonly inviteRepository: IInviteRepository,
    private readonly tenantRepository: ITenantRepository,
    private readonly userRepository: IUserRepository,
    private readonly membershipRepository: IMembershipRepository,
  ) {}

  async execute({
    userId,
    inviteId,
  }: {
    userId: string
    inviteId: string
  }): Promise<Invite> {
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

    const userMembership = await this.membershipRepository.getByUserOnTenant(
      userId,
      tenantExists.id,
    )
    if (userMembership) {
      throw new Error('User already has a membership in this tenant')
    }

    if (userExists.email !== invite.email) {
      throw new Error('User email does not match invite email')
    }

    await this.membershipRepository.create({
      tenantId: tenantExists.id,
      userId,
      role: invite.role,
    })

    return invite
  }
}
