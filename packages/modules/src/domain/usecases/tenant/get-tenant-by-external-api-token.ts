import { ITenantRepository } from '../../../interfaces/repositories/tenant'
import {
  tenantSettingsDefault,
  tenantSettingsSchema,
} from '../../../infrastructure/json-parser/jsons/tenant'
import { JsonParserDateObject } from '../../../infrastructure/json-parser/json-parser'
import { Tenant } from '../../entities/Tenant'

export class GetTenantByExternalApiTokenUseCase {
  constructor(private readonly tenantRepository: ITenantRepository) {}

  async execute(token: string) {
    if (!token) {
      throw new Error('Token are required')
    }

    const tenant = await this.tenantRepository.getByExternalApiToken(token)
    if (!tenant) {
      return null
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
