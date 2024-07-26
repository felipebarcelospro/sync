import { HttpResponseError } from './errors'
import { ApiHandlerContext, ApiMiddleware } from './lib'
import { getTenantSubscription } from '../payment/get-tenant-subscription'
import { modules } from '@app/modules/src'
import { TenantModel } from '@/types/tenant'

type Auth = {
  tenant: TenantModel
}

// Middleware que adiciona um usuário ao contexto
export const authMiddleware: ApiMiddleware<
  ApiHandlerContext<any, any, any, Auth>
> = async (req, context) => {
  const token = req.headers.get('Authorization') || context.params?.token

  if (!token) {
    throw new HttpResponseError({
      status: 403,
      message: 'Authorization token is missing',
    })
  }

  const tokenParts = token.split(' ')

  if (tokenParts.length !== 2 || tokenParts[0].toLowerCase() !== 'bearer') {
    throw new HttpResponseError({
      status: 403,
      message: 'Invalid authorization token format',
    })
  }

  const authToken = tokenParts[1]

  const tenant =
    await modules.usecases.tenant.getTenantByExternalApiToken.execute(authToken)

  if (!tenant || !tenant.id) {
    throw new HttpResponseError({
      status: 403,
      message: 'Authorization token is invalid',
    })
  }

  context.tenant = {
    ...tenant,
    subscription: await getTenantSubscription(tenant.id),
  }
}
