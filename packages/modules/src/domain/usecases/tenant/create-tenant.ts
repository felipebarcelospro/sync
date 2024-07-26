import { JsonParserDateObject } from '../../../infrastructure/json-parser/json-parser'
import {
  tenantSettingsDefault,
  tenantSettingsSchema,
} from '../../../infrastructure/json-parser/jsons/tenant'
import { SlugValueObject } from '../../../infrastructure/slug/value-object-slug'
import { IPaymentProvider } from '../../../interfaces/providers/payment'
import { IMembershipRepository } from '../../../interfaces/repositories/membership'
import { IPlanPriceRepository } from '../../../interfaces/repositories/plan-price'
import { ISubscriptionRepository } from '../../../interfaces/repositories/subscription'
import { ITenantRepository } from '../../../interfaces/repositories/tenant'
import { IUserRepository } from '../../../interfaces/repositories/user'
import { ChildPartial } from '../../../types/child-partial'
import { Tenant, TenantSettings } from '../../entities/Tenant'

export class CreateTenantUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly tenantRepository: ITenantRepository,
    private readonly membershipRepository: IMembershipRepository,
    private readonly subscriptionRepository: ISubscriptionRepository,
    private readonly paymentProvider: IPaymentProvider,
    private readonly planPriceRepository: IPlanPriceRepository,
  ) {}

  async execute(
    userId: string,
    data: {
      name: string
      settings: ChildPartial<TenantSettings>
    },
  ): Promise<Tenant> {
    const userExists = await this.userRepository.getById(userId)
    if (!userExists) {
      throw new Error('User does not exist')
    }

    const slug = SlugValueObject.createFromText(data.name)
    const slugAlreadyExists = await this.tenantRepository.getBySlug(slug)

    if (slugAlreadyExists) {
      throw new Error('Slug already exists')
    }

    const settings = JsonParserDateObject.parse({
      schema: tenantSettingsSchema,
      data: {
        default: tenantSettingsDefault,
        upsert: data.settings,
      },
    })

    if (settings.success === false) {
      throw new Error('Tenant settings is invalid')
    }

    const customer = await this.paymentProvider.upsertCustomer({
      name: data.name,
      email: settings.data.billing.email as string,
    })

    const planPrice = await this.planPriceRepository.getFreePlanPrice()

    if (!planPrice) {
      throw new Error('Plan Price is invalid')
    }

    const tenant = await this.tenantRepository.create({
      name: data.name,
      slug,
      paymentProviderId: customer.id,
      settings: settings.data,
    })

    await this.membershipRepository.create({
      tenantId: tenant.id,
      userId,
      role: 'owner',
    })

    const subscription = await this.paymentProvider.createSubscription({
      customerId: customer.id,
      planId: planPrice.paymentProviderId,
    })

    await this.subscriptionRepository.create({
      tenantId: tenant.id,
      status: subscription.status,
      priceId: planPrice.id,
      paymentProviderId: subscription.paymentProviderId,
    })

    return tenant
  }
}
