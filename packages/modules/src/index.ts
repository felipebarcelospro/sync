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
import { DOSpacesStorageProvider } from './infrastructure/storage/digital-ocean-spaces'
import { StripePaymentProvider } from './infrastructure/payment/stripe-payment'
import { UpdateUserUseCase } from './domain/usecases/user/update-user'
import { GetInviteByIdUseCase } from './domain/usecases/invite/get-by-id'
import { GetUserByIdUseCase } from './domain/usecases/user/get-user'
import { ResendProvider } from './infrastructure/mail/resend-mail'
import { RegenerateExternalApiToken } from './domain/usecases/tenant/regenerate-external-api-token'
import { GetTenantByExternalApiTokenUseCase } from './domain/usecases/tenant/get-tenant-by-external-api-token'

// REPOSITORIES
const inviteRepository = new PrismaInviteRepository(db)
const tenantRepository = new PrismaTenantRepository(db)
const userRepository = new PrismaUserRepository(db)
const membershipRepository = new PrismaMembershipRepository(db)

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
