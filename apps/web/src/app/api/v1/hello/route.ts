import { authMiddleware } from '@/services/http/client'
import { createApiHandler } from '@/services/http/lib'
import { NextResponse } from 'next/server'

export const GET = createApiHandler({
  middlewares: [authMiddleware],
  handler: async () => {
    return NextResponse.json({ ok: true })
  },
})
