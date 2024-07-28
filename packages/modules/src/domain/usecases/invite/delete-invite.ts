import { IInviteRepository } from '../../../interfaces/repositories/invite'
import { IMembershipRepository } from '../../../interfaces/repositories/membership'
import { ITenantRepository } from '../../../interfaces/repositories/tenant'
import { IUserRepository } from '../../../interfaces/repositories/user'

export class DeleteInvitesUseCase {
  constructor(
    private readonly inviteRepository: IInviteRepository,
    private readonly tenantRepository: ITenantRepository,
    private readonly userRepository: IUserRepository,
    private readonly membershipRepository: IMembershipRepository,
  ) {}

  async execute({
    userId,
    tenantId,
    inviteId,
  }: {
    userId: string
    tenantId: string
    inviteId: string
  }): Promise<void> {
    const tenantExists = await this.tenantRepository.getById(tenantId)
    if (!tenantExists) {
      throw new Error('Tenant does not exist')
    }

    const userExists = await this.userRepository.getById(userId)
    if (!userExists) {
      throw new Error('User does not exist')
    }

    const userMembership = await this.membershipRepository.getByUserAndTenant(
      userId,
      tenantId,
    )
    if (!userMembership || userMembership.role !== 'owner') {
      throw new Error('User dont has a membership')
    }

    const invite = await this.inviteRepository.getById(inviteId)

    if (!invite) {
      throw new Error('Invite not found')
    }

    await this.inviteRepository.delete(inviteId)
  }
}
