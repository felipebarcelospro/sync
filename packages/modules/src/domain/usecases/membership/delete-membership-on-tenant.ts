import { IMembershipRepository } from '../../../interfaces/repositories/membership'
import { ITenantRepository } from '../../../interfaces/repositories/tenant'
import { IUserRepository } from '../../../interfaces/repositories/user'

export class DeleteMembershipOnTenantUseCase {
  constructor(
    private readonly membershipRepository: IMembershipRepository,
    private readonly tenantRepository: ITenantRepository,
    private readonly userRepository: IUserRepository,
  ) {}

  async execute({
    currentTenantId,
    currentUserId,
    membershipToDeleteId,
  }: {
    currentUserId: string
    currentTenantId: string
    membershipToDeleteId: string
  }): Promise<void> {
    const tenantExists = await this.tenantRepository.getById(currentTenantId)
    if (!tenantExists) {
      throw new Error('Tenant does not exist')
    }

    const userExists = await this.userRepository.getById(currentUserId)
    if (!userExists) {
      throw new Error('User does not exist')
    }

    const currentUserMembership =
      await this.membershipRepository.getByUserAndTenant(
        currentUserId,
        currentTenantId,
      )

    if (!currentUserMembership || currentUserMembership.role !== 'owner') {
      throw new Error('Current user is not an owner')
    }

    const membershipToDelete =
      await this.membershipRepository.getById(membershipToDeleteId)

    if (!membershipToDelete) {
      throw new Error('Membership not found')
    }

    await this.membershipRepository.delete(membershipToDeleteId)
  }
}
