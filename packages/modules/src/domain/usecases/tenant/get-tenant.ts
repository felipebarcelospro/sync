import { ITenantRepository } from '../../../interfaces/repositories/tenant'
import { IUserRepository } from '../../../interfaces/repositories/user'
import { IMembershipRepository } from '../../../interfaces/repositories/membership'
import {
  tenantSettingsDefault,
  tenantSettingsSchema,
} from '../../../infrastructure/json-parser/jsons/tenant'
import { JsonParserDateObject } from '../../../infrastructure/json-parser/json-parser'
import { Tenant } from '../../entities/Tenant'

export class GetTenantUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly tenantRepository: ITenantRepository,
    private readonly membershipRepository: IMembershipRepository,
  ) {}

  async execute(tenantId: string, userId?: string) {
    if (!tenantId || !userId) {
      throw new Error('Tenant ID and User ID are required')
    }

    const tenant = await this.tenantRepository.getById(tenantId)
    if (!tenant) {
      throw new Error('Tenant not found')
    }

    const user = await this.userRepository.getById(userId)
    if (!user) {
      throw new Error('User not found')
    }

    const membership = await this.membershipRepository.getByUserAndTenant(
      userId,
      tenantId,
    )
    if (!membership) {
      throw new Error('Membership not valid')
    }

    const settings = JsonParserDateObject.parse({
      schema: tenantSettingsSchema,
      data: {
        default: tenantSettingsDefault,
        current: tenant.settings,
      },
    })

    return {
      ...tenant,
      settings:
        settings.success === false ? tenantSettingsDefault : settings.data,
    } as Tenant
  }
}
