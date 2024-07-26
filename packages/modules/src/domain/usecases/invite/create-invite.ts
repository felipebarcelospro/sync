import {
  IInviteRepository,
  CreateInviteDTO,
} from '../../../interfaces/repositories/invite'
import { ITenantRepository } from '../../../interfaces/repositories/tenant'
import { Invite } from '../../entities/Invite'

export class CreateInviteUseCase {
  constructor(
    private readonly inviteRepository: IInviteRepository,
    private readonly tenantRepository: ITenantRepository,
  ) {}

  async execute(
    tenantId: string,
    data: Omit<CreateInviteDTO, 'expiresAt' | 'acceptedAt'>,
  ): Promise<Invite> {
    const tenantExists = await this.tenantRepository.getById(tenantId)
    if (!tenantExists) {
      throw new Error('Tenant does not exist')
    }

    const sevenDaysLater = new Date()
    sevenDaysLater.setDate(sevenDaysLater.getDate() + 7)
    const expiresAt = sevenDaysLater

    const existingInvite = await this.inviteRepository.getByEmailAndTenantId(
      data.email,
      tenantId,
    )

    let invite
    if (existingInvite) {
      invite = await this.inviteRepository.update(existingInvite.id, {
        ...existingInvite,
        expiresAt,
      })
    } else {
      invite = await this.inviteRepository.create(tenantId, {
        email: data.email,
        role: data.role,
        expiresAt,
      })
    }

    return invite
  }
}
