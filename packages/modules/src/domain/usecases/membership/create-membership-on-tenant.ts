import {
  IMembershipRepository,
  CreateMembershipDTO,
} from '../../../interfaces/repositories/membership'
import { ITenantRepository } from '../../../interfaces/repositories/tenant'
import { IUserRepository } from '../../../interfaces/repositories/user'
import { Membership } from '../../entities/Membership'

export class CreateMembershipOnTenantUseCase {
  constructor(
    private readonly membershipRepository: IMembershipRepository,
    private readonly tenantRepository: ITenantRepository,
    private readonly userRepository: IUserRepository,
  ) {}

  async execute({
    tenantId,
    userId,
    role,
  }: CreateMembershipDTO): Promise<Membership> {
    const tenant = await this.tenantRepository.getById(tenantId)
    if (!tenant) {
      throw new Error('Tenant not found')
    }

    const user = await this.userRepository.getById(userId)
    if (!user) {
      throw new Error('User not found')
    }

    const existingMembership =
      await this.membershipRepository.getByUserOnTenant(tenantId, userId)
    if (existingMembership) {
      throw new Error('Membership already exists')
    }

    const membership = await this.membershipRepository.create({
      tenantId,
      userId,
      role,
    })

    return membership
  }
}
