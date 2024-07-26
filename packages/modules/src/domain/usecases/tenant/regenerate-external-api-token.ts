import { JsonParserDateObject } from '../../../infrastructure/json-parser/json-parser'
import {
  tenantSettingsDefault,
  tenantSettingsSchema,
} from '../../../infrastructure/json-parser/jsons/tenant'
import { NodeUUIDProvider } from '../../../infrastructure/uuid/node-uuid'
import { IMembershipRepository } from '../../../interfaces/repositories/membership'
import { ITenantRepository } from '../../../interfaces/repositories/tenant'
import { IUserRepository } from '../../../interfaces/repositories/user'

export class RegenerateExternalApiToken {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly tenantRepository: ITenantRepository,
    private readonly membershipRepository: IMembershipRepository,
  ) {}

  async execute(userId: string, tenantId: string): Promise<string> {
    const tenantAlreadyExists = await this.tenantRepository.getById(tenantId)
    if (!tenantAlreadyExists) {
      throw new Error('Tenant not exists')
    }

    const userExists = await this.userRepository.getById(userId)
    if (!userExists) {
      throw new Error('User does not exist')
    }

    const membership = await this.membershipRepository.getByUserOnTenant(
      userId,
      tenantId,
    )

    if (!membership) {
      throw new Error('Tenant not exists')
    }

    const token = NodeUUIDProvider.generate()

    const parsedSettings = JsonParserDateObject.parse({
      schema: tenantSettingsSchema,
      data: {
        default: tenantSettingsDefault,
        current: tenantAlreadyExists.settings,
        upsert: {
          integrations: {
            external: {
              token,
            },
          },
        },
      },
    })

    if (parsedSettings.success === false) {
      throw new Error('Tenant settings is invalid')
    }

    await this.tenantRepository.update(tenantId, {
      settings: parsedSettings.data,
    })

    return token
  }
}
