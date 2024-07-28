import { IInviteRepository } from '../../../interfaces/repositories/invite'
import { IMembershipRepository } from '../../../interfaces/repositories/membership'
import { ITenantRepository } from '../../../interfaces/repositories/tenant'
import { IUserRepository } from '../../../interfaces/repositories/user'
import { Invite } from '../../entities/Invite'

export class ListInvitesUseCase {
  constructor(
    private readonly inviteRepository: IInviteRepository,
    private readonly tenantRepository: ITenantRepository,
    private readonly userRepository: IUserRepository,
    private readonly membershipRepository: IMembershipRepository,
  ) {}

  async execute({
    userId,
    tenantId,
  }: {
    userId: string
    tenantId: string
  }): Promise<Invite[]> {
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
    if (!userMembership) {
      throw new Error('User dont has a membership')
    }

    const invites = await this.inviteRepository.list(tenantId)

    return invites
  }
}
