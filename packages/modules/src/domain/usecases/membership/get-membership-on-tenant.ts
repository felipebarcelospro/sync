import { IMembershipRepository } from '../../../interfaces/repositories/membership'
import { ITenantRepository } from '../../../interfaces/repositories/tenant'
import { IUserRepository } from '../../../interfaces/repositories/user'
import { Membership } from '../../entities/Membership'

export class GetMembershipOnTenantUseCase {
  constructor(
    private membershipRepository: IMembershipRepository,
    private tenantRepository: ITenantRepository,
    private userRepository: IUserRepository,
  ) {}

  async execute(tenantId: string, userId: string): Promise<Membership | null> {
    const tenant = await this.tenantRepository.getById(tenantId)
    if (!tenant) {
      throw new Error('Tenant does not exist')
    }

    const user = await this.userRepository.getById(userId)
    if (!user) {
      throw new Error('User does not exist')
    }

    const membership = await this.membershipRepository.getByUserOnTenant(
      userId,
      tenantId,
    )
    if (!membership) {
      return null
    }

    return membership
  }
}
