import { useContext } from 'react'

import { ApplicationContext } from '../_contexts/application.context'

export function useApplication() {
  return useContext(ApplicationContext)
}
