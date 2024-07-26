'use client'

import { getPlansAction } from '@/app/app/(settings)/settings/billing/actions'
import { APP_CONFIGS } from '@/boilerplate.config'
import { ReturnTypeWithoutPromise } from '@/services/actions/lib/utils'
import { ApplicationSession } from '@/services/session/types/application-session'

import React, { PropsWithChildren, createContext } from 'react'

interface ApplicationContextProps {
  session: ApplicationSession
  plans: ReturnTypeWithoutPromise<typeof getPlansAction>
  config: typeof APP_CONFIGS
}

export const ApplicationContext = createContext<ApplicationContextProps>({
  session: {
    user: null,
    tenant: null,
  },
  plans: [],
  config: APP_CONFIGS,
})

export const ApplicationProvider: React.FC<
  PropsWithChildren<{
    session: ApplicationSession
    plans: ReturnTypeWithoutPromise<typeof getPlansAction>
  }>
> = ({ children, session, plans }) => {
  return (
    <ApplicationContext.Provider
      value={{
        session,
        plans,
        config: APP_CONFIGS,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  )
}
