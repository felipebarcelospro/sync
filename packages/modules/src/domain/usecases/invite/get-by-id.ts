import { IInviteRepository } from '../../../interfaces/repositories/invite'

export class GetInviteByIdUseCase {
  private inviteRepository: IInviteRepository

  constructor(inviteRepository: IInviteRepository) {
    this.inviteRepository = inviteRepository
  }

  async execute(id: string) {
    const invite = await this.inviteRepository.getById(id)

    if (!invite) {
      throw new Error('Invite not found')
    }

    return invite
  }
}
