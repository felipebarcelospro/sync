import { db } from '@app/db'
import { PrismaInviteRepository } from './infrastructure/prisma/repositories/invite'
import { PrismaMembershipRepository } from './infrastructure/prisma/repositories/membership'
import { PrismaTenantRepository } from './infrastructure/prisma/repositories/tenant'
import { PrismaUserRepository } from './infrastructure/prisma/repositories/user'
import { AcceptInviteUseCase } from './domain/usecases/invite/accept-invite'
import { DeclineInviteUseCase } from './domain/usecases/invite/decline-invite'
import { CreateInviteUseCase } from './domain/usecases/invite/create-invite'
import { CreateMembershipOnTenantUseCase } from './domain/usecases/membership/create-membership-on-tenant'
import { DeleteMembershipOnTenantUseCase } from './domain/usecases/membership/delete-membership-on-tenant'
import { UpdateMembershipOnTenantUseCase } from './domain/usecases/membership/update-membership-on-tenant'
import { CreateTenantUseCase } from './domain/usecases/tenant/create-tenant'
import { ListMembershipsOnTenantUseCase } from './domain/usecases/membership/list-memberships-on-tenant'
import { ListInvitesUseCase } from './domain/usecases/invite/list-invites'
import { DeleteInvitesUseCase } from './domain/usecases/invite/delete-invite'
import { UpdateTenantUseCase } from './domain/usecases/tenant/update-tenant'
import { GetTenantUseCase } from './domain/usecases/tenant/get-tenant'
import { GetMembershipOnTenantUseCase } from './domain/usecases/membership/get-membership-on-tenant'
import { CreateSubscriptionUseCase } from './domain/usecases/subscriptions/create-subscription'
import { PrismaSubscriptionRepository } from './infrastructure/prisma/repositories/subscription'
import { PrismaPlanRepository } from './infrastructure/prisma/repositories/plan'
import { PrismaPlanPriceRepository } from './infrastructure/prisma/repositories/plan-price'
import { CancelSubscriptionUseCase } from './domain/usecases/subscriptions/cancel-subscription'
import { GetFirstSubscriptionOfTenantUseCase } from './domain/usecases/subscriptions/get-first-subscription-of-tenant'
import { GetSubscriptionByProviderIdUseCase } from './domain/usecases/subscriptions/get-subscription-by-provider-id'
import { ReactiveSubscriptionUseCase } from './domain/usecases/subscriptions/reactive-subscription'
import { UpdateSubscriptionUseCase } from './domain/usecases/subscriptions/update-subscription'
import { GetPlanByIdUseCase } from './domain/usecases/plan/get-plan-by-id'
import { UpsertPlanUseCase } from './domain/usecases/plan/upsert-plan'
import { GetPlanPriceByIdUseCase } from './domain/usecases/plan-price/get-plan-price-by-id'
import { CreatePlanPriceUseCase } from './domain/usecases/plan-price/create-plan-price'
import { UpdatePlanPriceUseCase } from './domain/usecases/plan-price/update-plan-price'
import { UpsertPlanPriceUseCase } from './domain/usecases/plan-price/upsert-plan-price'
import { DOSpacesStorageProvider } from './infrastructure/storage/digital-ocean-spaces'
import { StripePaymentProvider } from './infrastructure/payment/stripe-payment'
import { GetPlansUseCase } from './domain/usecases/plan/get-plans'
import { UpdateUserUseCase } from './domain/usecases/user/update-user'
import { GetInviteByIdUseCase } from './domain/usecases/invite/get-by-id'
import { GetUserByIdUseCase } from './domain/usecases/user/get-user'
import { GetPlanByProviderIdUseCase } from './domain/usecases/plan/get-plan-by-provider-id'
import { ResendProvider } from './infrastructure/mail/resend-mail'
import { RegenerateExternalApiToken } from './domain/usecases/tenant/regenerate-external-api-token'
import { GetTenantByExternalApiTokenUseCase } from './domain/usecases/tenant/get-tenant-by-external-api-token'

// REPOSITORIES
const inviteRepository = new PrismaInviteRepository(db)
const tenantRepository = new PrismaTenantRepository(db)
const userRepository = new PrismaUserRepository(db)
const membershipRepository = new PrismaMembershipRepository(db)
const subscriptionRepository = new PrismaSubscriptionRepository(db)
const planRepository = new PrismaPlanRepository(db)
const planPriceRepository = new PrismaPlanPriceRepository(db)

// PROVIDER
const mailProvider = new ResendProvider()
const storageProvider = new DOSpacesStorageProvider()
const paymentProvider = new StripePaymentProvider()

export const modules = {
  usecases: {
    invite: {
      declineInvite: new DeclineInviteUseCase(
        inviteRepository,
        userRepository,
        tenantRepository,
      ),
      createInvite: new CreateInviteUseCase(inviteRepository, tenantRepository),
      deleteInvite: new DeleteInvitesUseCase(
        inviteRepository,
        tenantRepository,
        userRepository,
        membershipRepository,
      ),
      listInvites: new ListInvitesUseCase(
        inviteRepository,
        tenantRepository,
        userRepository,
        membershipRepository,
      ),
      acceptInvite: new AcceptInviteUseCase(
        inviteRepository,
        tenantRepository,
        userRepository,
        membershipRepository,
      ),
      getInviteById: new GetInviteByIdUseCase(inviteRepository),
    },
    membership: {
      getMembershipOnTenant: new GetMembershipOnTenantUseCase(
        membershipRepository,
        tenantRepository,
        userRepository,
      ),
      createMembershipOnTenant: new CreateMembershipOnTenantUseCase(
        membershipRepository,
        tenantRepository,
        userRepository,
      ),
      deleteMembershipOnTenant: new DeleteMembershipOnTenantUseCase(
        membershipRepository,
        tenantRepository,
        userRepository,
      ),
      updateMembershipOnTenant: new UpdateMembershipOnTenantUseCase(
        membershipRepository,
      ),
      listMembershipsOnTenant: new ListMembershipsOnTenantUseCase(
        membershipRepository,
        tenantRepository,
        userRepository,
      ),
    },
    tenant: {
      getTenant: new GetTenantUseCase(
        userRepository,
        tenantRepository,
        membershipRepository,
      ),
      createTenant: new CreateTenantUseCase(
        userRepository,
        tenantRepository,
        membershipRepository,
        subscriptionRepository,
        paymentProvider,
        planPriceRepository,
      ),
      updateTenant: new UpdateTenantUseCase(
        userRepository,
        tenantRepository,
        membershipRepository,
      ),
      regenerateExternalApiToken: new RegenerateExternalApiToken(
        userRepository,
        tenantRepository,
        membershipRepository,
      ),
      getTenantByExternalApiToken: new GetTenantByExternalApiTokenUseCase(
        tenantRepository,
      ),
    },
    subscription: {
      createSubscription: new CreateSubscriptionUseCase(
        subscriptionRepository,
        tenantRepository,
        planPriceRepository,
      ),
      cancelSubscription: new CancelSubscriptionUseCase(
        subscriptionRepository,
        tenantRepository,
        planPriceRepository,
      ),
      getFirstSubscriptionOfTenant: new GetFirstSubscriptionOfTenantUseCase(
        subscriptionRepository,
        tenantRepository,
      ),
      getSubscriptionByProviderId: new GetSubscriptionByProviderIdUseCase(
        subscriptionRepository,
      ),
      reactiveSubscription: new ReactiveSubscriptionUseCase(
        subscriptionRepository,
        tenantRepository,
        planPriceRepository,
        planRepository,
      ),
      updateSubscription: new UpdateSubscriptionUseCase(subscriptionRepository),
    },
    plan: {
      getPlanById: new GetPlanByIdUseCase(planRepository),
      getPlanByProviderId: new GetPlanByProviderIdUseCase(planRepository),
      upsertPlan: new UpsertPlanUseCase(planRepository),
      getPlans: new GetPlansUseCase(planRepository),
    },
    planPrice: {
      getPlanPriceById: new GetPlanPriceByIdUseCase(planPriceRepository),
      createPlanPrice: new CreatePlanPriceUseCase(planPriceRepository),
      updatePlanPrice: new UpdatePlanPriceUseCase(planPriceRepository),
      upsertPlanPrice: new UpsertPlanPriceUseCase(planPriceRepository),
    },
    user: {
      updateUser: new UpdateUserUseCase(userRepository),
      getUserById: new GetUserByIdUseCase(userRepository),
    },
  },
  provider: {
    mail: mailProvider,
    storage: storageProvider,
    payment: paymentProvider,
  },
}
