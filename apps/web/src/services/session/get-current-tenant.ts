import { modules } from '@app/modules/src'
import { cookies, headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { TenantModel } from '@/types/tenant'
import { User } from '@app/modules/src/domain/entities/User'
import { getTenantSubscription } from '../payment/get-tenant-subscription'
import { isValidUUID } from '@/helpers/is-valid-uuid'

async function fetchTenantData(tenantId: string, userId: string) {
  try {
    const membership =
      await modules.usecases.membership.getMembershipOnTenant.execute(
        tenantId,
        userId,
      )
    if (!membership) {
      console.log(
        `No membership found for tenantId: ${tenantId} and userId: ${userId}`,
      )
      return null
    }

    const tenantData = await modules.usecases.tenant.getTenant.execute(
      tenantId,
      userId,
    )
    if (!tenantData) {
      console.log(
        `No tenant data found for tenantId: ${tenantId} and userId: ${userId}`,
      )
      return null
    }

    const subscription = await getTenantSubscription(tenantData.id)
    return { ...tenantData, subscription }
  } catch (error) {
    console.error(
      `Error fetching tenant data for tenantId: ${tenantId} and userId: ${userId}`,
      error,
    )
    return null
  }
}

export const getCurrentTenant = async (user: User): Promise<TenantModel> => {
  const pathname = headers().get('x-pathname')
  const tenantId = cookies().get('x-tenant')?.value

  if (!tenantId) {
    if (
      user.memberships[0]?.tenant.id &&
      isValidUUID(user.memberships[0].tenant.id)
    ) {
      // If there's no tenantId from the cookie but there is a valid first tenant from the user's memberships, redirect to save it in the cookie
      return redirect(`/app/select-account/${user.memberships[0].tenant.id}`)
    }
  }

  if (tenantId && isValidUUID(tenantId)) {
    // If there is a valid tenantId, attempt to fetch tenant data
    const tenant = await fetchTenantData(tenantId, user.id)

    if (!tenant) {
      if (!pathname.includes('/app/get-started')) {
        console.log(`No tenant data could be fetched for tenantId: ${tenantId}`)
        return redirect('/app/select-account')
      }
    } else {
      // Return the tenant data if fetched successfully
      return tenant as TenantModel
    }
  } else if (!pathname.includes('/app/get-started')) {
    // If tenantId is not valid and not on get-started page, redirect to get-started
    return redirect('/app/get-started')
  }
}
