import {
  IMembershipRepository,
  UpdateMembershipDTO,
} from '../../../interfaces/repositories/membership'
import { Membership } from '../../entities/Membership'

export class UpdateMembershipOnTenantUseCase {
  constructor(private readonly membershipRepository: IMembershipRepository) {}

  async execute(
    membershipId: string,
    data: UpdateMembershipDTO,
  ): Promise<Membership> {
    const existingMembership =
      await this.membershipRepository.getById(membershipId)
    if (!existingMembership) {
      throw new Error('Membership not found')
    }

    const updatedMembership = await this.membershipRepository.update(
      membershipId,
      data,
    )

    return updatedMembership
  }
}
