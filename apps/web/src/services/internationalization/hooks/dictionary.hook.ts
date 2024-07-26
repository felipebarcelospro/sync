import { useContext } from 'react'
import { LocaleContext } from '@/services/internationalization/contexts/locale.context'

export function useDictionary() {
  return useContext(LocaleContext)
}
