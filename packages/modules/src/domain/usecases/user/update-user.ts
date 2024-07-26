import {
  DeepPartial,
  JsonParserDateObject,
} from '../../../infrastructure/json-parser/json-parser'
import {
  userSettingsDefault,
  userSettingsSchema,
} from '../../../infrastructure/json-parser/jsons/user'
import {
  IUserRepository,
  UpdateUserDTO,
} from '../../../interfaces/repositories/user'
import { UserSettings } from '../../entities/User'

export class UpdateUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(id: string, data: DeepPartial<UpdateUserDTO>): Promise<void> {
    const user = await this.userRepository.getById(id)

    if (!user) {
      throw new Error('User not found')
    }

    let settings = user.settings

    if (data.settings) {
      const parsedSettings = JsonParserDateObject.parse({
        schema: userSettingsSchema,
        data: {
          default: userSettingsDefault,
          current: user.settings,
          upsert: data.settings,
        },
      })

      if (parsedSettings.success === false) {
        throw new Error('Tenant settings is invalid')
      }

      settings = parsedSettings.data as UserSettings
    }

    await this.userRepository.update(id, {
      name: data.name,
      username: data.username,
      image: data.image,
      settings,
    })
  }
}
