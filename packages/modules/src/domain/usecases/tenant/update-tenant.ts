import { JsonParserDateObject } from '../../../infrastructure/json-parser/json-parser'
import {
  tenantSettingsDefault,
  tenantSettingsSchema,
} from '../../../infrastructure/json-parser/jsons/tenant'
import { IMembershipRepository } from '../../../interfaces/repositories/membership'
import {
  ITenantRepository,
  UpdateTenantDTO,
} from '../../../interfaces/repositories/tenant'
import { IUserRepository } from '../../../interfaces/repositories/user'
import { Tenant, TenantSettings } from '../../entities/Tenant'

export class UpdateTenantUseCase {
  constructor(
    private readonly useRepository: IUserRepository,
    private readonly tenantRepository: ITenantRepository,
    private readonly membershipRepository: IMembershipRepository,
  ) {}

  async execute(
    userId: string,
    tenantId: string,
    data: Omit<UpdateTenantDTO, 'slug'>,
  ): Promise<Tenant> {
    const tenantAlreadyExists = await this.tenantRepository.getById(tenantId)
    if (!tenantAlreadyExists) {
      throw new Error('Tenant not exists')
    }

    const userExists = await this.useRepository.getById(userId)
    if (!userExists) {
      throw new Error('User does not exist')
    }

    const membership = await this.membershipRepository.getByUserAndTenant(
      userId,
      tenantId,
    )

    if (!membership) {
      throw new Error('Tenant not exists')
    }

    let settings = tenantAlreadyExists.settings

    if (data.settings) {
      const parsedSettings = JsonParserDateObject.parse({
        schema: tenantSettingsSchema,
        data: {
          default: tenantSettingsDefault,
          current: tenantAlreadyExists.settings,
          upsert: data.settings,
        },
      })

      if (parsedSettings.success === false) {
        throw new Error('Tenant settings is invalid')
      }

      settings = parsedSettings.data as TenantSettings
    }

    const tenant = await this.tenantRepository.update(tenantId, {
      name: data.name,
      logo: data.logo,
      settings,
      paymentProviderId: data.paymentProviderId,
    })

    return tenant
  }
}
