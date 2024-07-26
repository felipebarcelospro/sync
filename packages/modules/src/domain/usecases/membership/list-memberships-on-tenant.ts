import { IMembershipRepository } from '../../../interfaces/repositories/membership'
import { ITenantRepository } from '../../../interfaces/repositories/tenant'
import { IUserRepository } from '../../../interfaces/repositories/user'
import { Membership } from '../../entities/Membership'

export class ListMembershipsOnTenantUseCase {
  constructor(
    private readonly membershipRepository: IMembershipRepository,
    private readonly tenantRepository: ITenantRepository,
    private readonly userRepository: IUserRepository,
  ) {}

  async execute({
    tenantId,
    userId,
  }: {
    tenantId: string
    userId: string
  }): Promise<Membership[]> {
    const tenant = await this.tenantRepository.getById(tenantId)
    if (!tenant) {
      throw new Error('Tenant not found')
    }

    const user = await this.userRepository.getById(userId)
    if (!user) {
      throw new Error('User not found')
    }

    const existingMembership =
      await this.membershipRepository.getByUserOnTenant(userId, tenantId)
    if (!existingMembership) {
      throw new Error('User dont has a membership')
    }

    const memberships = await this.membershipRepository.list(tenantId)

    return memberships
  }
}
